from typing import Sequence
from uuid import UUID

import jwt

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from passlib.hash import bcrypt

from sqlmodel import Session, select, column

from api.models import User, UserCreate, UserRead, UserUpdate, UserReadWithPosts, Post, PostCreate, PostRead, PostUpdate, PostReadWithUser
from api.database import lifespan, get_session
from api.services import Token, Search, authenticate_user, create_token, get_post, get_user
from api.config import CONFIG


app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

oauth2schema = OAuth2PasswordBearer(tokenUrl="api/token")


@app.get("/api")
async def root():
    return {"message": "Connection to API established"}


@app.post("/api/token", response_model=Token)
async def generate_token(*, form: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = await authenticate_user(form.username, form.password, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return await create_token(user)


@app.post("/api/users", response_model=Token)
async def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    if await get_user(user.username, "username", session):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username not available")
    
    if await get_user(user.email, "email", session):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already used")

    db_user = User(username=user.username, email=user.email, hashed_password=bcrypt.hash(user.password))
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return await create_token(db_user)


@app.get("/api/users", response_model=Sequence[UserRead])
async def read_users(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    query = select(User)
    if limit:
        query = query.limit(limit)
    
    if offset:
        query = query.offset(offset)

    users = session.exec(query).all()

    return users


@app.get("/api/users/id={user_id}", response_model=UserReadWithPosts)
async def read_user(*, session: Session = Depends(get_session), user_id: UUID):
    user = await get_user(user_id, "id", session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return user


@app.patch("/api/users/id={user_id}", response_model=UserRead)
async def update_user(*, session: Session = Depends(get_session), user_id: UUID, user: UserUpdate):
    db_user = await get_user(user_id, "id", session)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    user_data = user.model_dump(exclude_unset=True)
    if "password" in user_data.keys():
        new_password = user_data.pop("password")
        if db_user.verify_password(new_password):
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="New password should be different")

        db_user.hashed_password = bcrypt.hash(new_password)

    for key, value in user_data.items():
        setattr(db_user, key, value)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@app.delete("/api/users/id={user_id}")
async def delete_user(*, session: Session = Depends(get_session), user_id: UUID):
    user = await get_user(user_id, "id", session)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    session.delete(user)
    session.commit()

    return {"status": "completed", "detail": "User has been deleted succesfully"}


@app.get("/api/users/me", response_model=UserReadWithPosts)
async def read_current_user(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema)):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        user = await get_user(user_data["id"], "id", session)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return user


@app.patch("/api/users/me", response_model=UserRead)
async def update_current_user(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema), user: UserUpdate):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        db_user = await update_user(session=session, user_id=user_data["id"], user=user)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return db_user


@app.delete("/api/users/me")
async def delete_current_user(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema)):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        delete_message = await delete_user(session=session, user_id=user_data["id"])
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return delete_message


@app.post("/api/posts", response_model=PostRead)
async def create_post(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema), post: PostCreate):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        user = await get_user(user_data["id"], "id", session)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    db_post = Post(
        title=post.title,
        body=post.body,
        tags=post.tags,
        author_id=UUID(user_data["id"]),
        author=user
    )         

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.get("/api/posts", response_model=Sequence[PostReadWithUser])
async def read_posts(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    query = select(Post)
    if limit:
        query = query.limit(limit)
    if offset:
        query = query.offset(offset)

    posts = session.exec(query.order_by(column("created_at").desc())).all()

    return posts


@app.get("/api/posts/id={post_id}", response_model=PostReadWithUser)
async def read_post(*, session: Session = Depends(get_session), post_id: UUID):
    post = await get_post(post_id, "id", session)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    return post


@app.patch("/api/posts/id={post_id}")
async def update_post(*, session: Session = Depends(get_session), post_id: UUID, post: PostUpdate):
    db_post = await get_post(post_id, "id", session)
    if not db_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    post_data = post.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.delete("/api/posts/id={post_id}")
async def delete_post(*, session: Session = Depends(get_session), post_id: UUID):
    post = await get_post(post_id, "id", session)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    session.delete(post)
    session.commit()

    return {"status": "completed", "detail": "Post has been deleted succesfully"}


@app.patch("/api/users/me/posts/id={post_id}", response_model=PostReadWithUser)
async def update_current_user_post(*,session: Session = Depends(get_session), token: str = Depends(oauth2schema), post_id: UUID, post: PostUpdate):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        user = await get_user(user_data["id"], "id", session)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    db_post = await get_post(post_id, "id", session)
    if not db_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    if not isinstance(db_post, Post):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    if not isinstance(user, User):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if db_post.author.id != user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only the post owner can edit it")
    
    post_data = post.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.delete("/api/users/me/posts/id={post_id}")
async def delete_current_user_post(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema), post_id: UUID):
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        user = await get_user(user_data["id"], "id", session)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    post = await get_post(post_id, "id", session)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    if not isinstance(post, Post):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    if not isinstance(user, User):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if post.author.id != user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only the post owner can delete it")
    
    session.delete(post)
    session.commit()

    return {"status": "completed", "detail": "Post has been deleted succesfully"}


@app.get("/api/search/q={query}", response_model=Search)
async def search(*, session: Session = Depends(get_session), query: str):
    search_instance = Search(
        posts_by_title=await get_post(query, param="title", session=session),       # type: ignore
        posts_by_tags=await get_post(query, param="tags", session=session),         # type: ignore
        posts_by_body=await get_post(query, param="body", session=session),         # type: ignore
    )

    return search_instance
