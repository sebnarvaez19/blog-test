from typing import Literal, Optional, Sequence
from uuid import UUID

import jwt

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from passlib.hash import bcrypt

from sqlmodel import Session, select, column

from api.models import User, UserCreate, UserRead, UserUpdate, UserReadWithPosts, Post, PostCreate, PostRead, PostUpdate, PostReadWithUser, PostReadWithUserAndComments, Comment, CommentCreate
from api.database import lifespan, get_session
from api.services import Token, authenticate_user, create_token, get_post, get_user, get_comment, get_current_user, get_post_from_current_user, get_post_and_current_user, search_post
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
    user = await authenticate_user(session, form.username, form.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return await create_token(user)


@app.post("/api/users", response_model=Token)
async def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    if await get_user(session, user.username, "username"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username not available")
    
    if await get_user(session, user.email, "email"):
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
    user = await get_user(session, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return user


@app.patch("/api/users/id={user_id}", response_model=UserRead)
async def update_user(*, session: Session = Depends(get_session), user_id: UUID, user: UserUpdate):
    db_user = await get_user(session, user_id)
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
    user = await get_user(session, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    session.delete(user)
    session.commit()

    return {"status": "completed", "detail": "User has been deleted succesfully"}


@app.get("/api/users/me", response_model=UserReadWithPosts)
async def read_current_user(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema)):
    user = await get_current_user(session, token)
    
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
    user = await get_current_user(session, token)

    db_post = Post(
        title=post.title,
        body=post.body,
        tags=post.tags,
        author_id=user.id,                                              #type: ignore
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


@app.get("/api/posts/id={post_id}", response_model=PostReadWithUserAndComments)
async def read_post(*, session: Session = Depends(get_session), post_id: UUID):
    post = await get_post(session, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    return post


@app.patch("/api/posts/id={post_id}")
async def update_post(*, session: Session = Depends(get_session), post_id: UUID, post: PostUpdate):
    db_post = await get_post(session, post_id)
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
    post = await get_post(session, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    session.delete(post)
    session.commit()

    return {"status": "completed", "detail": "Post has been deleted succesfully"}


@app.patch("/api/users/me/posts/id={post_id}", response_model=PostReadWithUser)
async def update_current_user_post(*,session: Session = Depends(get_session), token: str = Depends(oauth2schema), post_id: UUID, post: PostUpdate):
    db_post = await get_post_from_current_user(session, token, post_id)
    
    post_data = post.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.delete("/api/users/me/posts/id={post_id}")
async def delete_current_user_post(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema), post_id: UUID):
    post = await get_post_from_current_user(session, token, post_id)
    
    session.delete(post)
    session.commit()

    return {"status": "completed", "detail": "Post has been deleted succesfully"}


@app.get("/api/search/q={query}", response_model=Sequence[Post])
async def search(*, session: Session = Depends(get_session), query: str, field: Optional[Literal["title", "tags", "body"]] = None):
    posts = await search_post(session, query, field)

    return posts


@app.post("/api/comments/post={post_id}", response_model=PostReadWithUserAndComments)
async def create_comment(*, session: Session = Depends(get_session), token: str = Depends(oauth2schema), post_id: UUID, comment: CommentCreate):
    user, post = await get_post_and_current_user(session, token, post_id)

    db_comment = Comment(body=comment.body, author_id=user.id, post_id=post.id, author=user, post=post)    # type: ignore

    session.add(db_comment)
    session.commit()
    session.refresh(post)

    return post


@app.delete("/api/comments/id={comment_id}")
async def delete_comment(*, session: Session = Depends(get_session), comment_id: UUID):
    comment = await get_comment(session, comment_id)
    
    session.delete(comment)
    session.commit()
    
    return {"status": "completed", "detail": "Comment has been deleted succesfully"}
