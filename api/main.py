from contextlib import asynccontextmanager
from typing import List
from uuid import UUID

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .models import User, Post
from .database import create_db_and_tables, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


async def get_session():
    with Session(engine) as session:
        yield session


app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def main():
    return {"message": "Hi, go to docs to test the API"}


@app.get("/users/", response_model=List[User])
async def read_users(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    query = select(User)
    if limit:
        query = query.limit(limit)

    if offset:
        query = query.offset(offset)
    
    users = session.exec(query).all()

    return users


@app.get("/users/{user_id}", response_model=User)
async def read_user(*, session: Session = Depends(get_session), user_id: UUID):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user


@app.post("/users/", response_model=User)
async def create_user(*, session: Session = Depends(get_session), user: User):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@app.patch("/users/{user_id}", response_model=User)
async def update_user(*, session: Session = Depends(get_session), user_id: UUID, user: User):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = user.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@app.delete("/users/{user_id}")
async def delete_user(*, session: Session = Depends(get_session), user_id: UUID):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(user)
    session.commit()

    return {"ok": True}


@app.get("/posts/", response_model=List[Post])
async def read_posts(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    query = select(Post)
    if limit:
        query = query.limit(limit)

    if offset:
        query = query.offset(offset)

    posts = session.exec(query).all()

    return posts


@app.post("/posts/", response_model=Post)
async def create_post(*, session: Session = Depends(get_session), post: Post):
    db_post = Post.model_validate(post)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.get("/posts/{post_id}", response_model=Post)
async def read_post(*, session: Session = Depends(get_session), post_id: UUID):
    db_post = session.get(Post, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return db_post


@app.patch("/posts/{post_id}", response_model=Post)
async def update_post(*, session: Session = Depends(get_session), post_id: UUID, post: Post):
    db_post = session.get(Post, post_id)
    if not db_post:
        HTTPException(status_code=404, detail="Post not found")

    post_data = post.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.delete("/posts/{post_id}")
async def delete_post(*, session: Session = Depends(get_session), post_id: UUID):
    post = session.get(Post, post_id)
    if not post:
        HTTPException(status_code=404, detail="Post not found")

    session.delete(post)
    session.commit()

    return {"ok": True}
