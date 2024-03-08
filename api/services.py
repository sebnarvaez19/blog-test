from typing import Optional, Union, Literal, Sequence
from uuid import UUID

import jwt

from fastapi import HTTPException, status
from pydantic import BaseModel
from sqlmodel import Session, column, select, or_

from api.models import User, Post
from api.config import CONFIG


class Token(BaseModel):
    access_token: str
    token_type: str


async def create_token(user: User) -> Token:
    user_data = user.model_dump(exclude={"hashed_password", "email"})
    user_data = {key: str(value) for key, value in user_data.items()}

    token = jwt.encode(user_data, key=CONFIG.SECRET_KEY, algorithm=CONFIG.ALGORITHM)

    return Token(access_token=token, token_type="bearer")


async def get_user(session: Session, query: Union[UUID, str], param: Literal["id", "username", "email"] = "id") -> Optional[User]:
    if param == "id":
        statement = select(User).where(User.id == query)
    if param == "username":
        statement = select(User).where(User.username == query)
    if param == "email":
        statement = select(User).where(User.email == query)

    user = session.exec(statement).one_or_none()

    return user


async def get_post(session: Session, query: Union[UUID, str], param: Literal["id", "title", "body", "tags"] = "id") -> Optional[Post]:
    if param == "id":
        statement = select(Post).where(Post.id == query)
    if param == "title":
        statement = select(Post).where(Post.title == query)
    if param == "tags":
        statement = select(Post).where(Post.tags == query)
    if param == "body":
        statement = select(Post).where(Post.body == query)

    post = session.exec(statement).one_or_none()

    return post


async def get_post_from_current_user(session: Session, token: str, post_id: UUID) -> Post:
    try:
        user_data = jwt.decode(token, key=CONFIG.SECRET_KEY, algorithms=[CONFIG.ALGORITHM])
        user = await get_user(session, user_data["id"])
        assert isinstance(user, User)
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    post = await get_post(session, post_id)
    if not (post and isinstance(post, Post)):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

    if post.author.id != user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only the post owner can delete it")
    
    return post
    


async def authenticate_user(session: Session, username: str, password: str) -> Union[User, Literal[False]]:
    user = await get_user(session, username, "username")
    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user


async def search_post(session: Session, query: str, field: Optional[Literal["title", "tags", "body"]] = None) -> Sequence[Post]:
    words = query.split()

    title_filters = [Post.title.ilike(f"%{word}%") for word in words]           # type: ignore
    tags_filters = [Post.tags.ilike(f"%{word}%") for word in words]             # type: ignore
    body_filters = [Post.body.ilike(f"%{word}%") for word in words]             # type: ignore

    if not field:
        filters = title_filters + tags_filters + body_filters
    if field == "title":
        filters = title_filters
    if field == "tags":
        filters = tags_filters
    if field == "body":
        filters = body_filters
    
    statement = select(Post).where(or_(*filters))
    posts = session.exec(statement.order_by(column("created_at").desc())).all()

    return posts
