from typing import Optional, Union, Literal, Sequence
from uuid import UUID

import jwt

from sqlmodel import Session, select, or_

from pydantic import BaseModel

from api.models import User, Post
from api.config import CONFIG


class Token(BaseModel):
    access_token: str
    token_type: str


class Search(BaseModel):
    posts_by_title: Optional[Sequence[Post]] = None
    posts_by_tags: Optional[Sequence[Post]] = None
    posts_by_body: Optional[Sequence[Post]] = None


async def create_token(user: User) -> Token:
    user_data = user.model_dump(exclude={"hashed_password", "email"})
    user_data = {key: str(value) for key, value in user_data.items()}

    token = jwt.encode(user_data, key=CONFIG.SECRET_KEY, algorithm=CONFIG.ALGORITHM)

    return Token(access_token=token, token_type="bearer")


async def get_user(query: Union[UUID, str], param: Literal["id", "username", "email"], session: Session) -> Optional[User]:
    if param == "id":
        statement = select(User).where(User.id == query)
    if param == "username":
        statement = select(User).where(User.username == query)
    if param == "email":
        statement = select(User).where(User.email == query)

    user = session.exec(statement).one_or_none()

    return user


async def get_post(query: Union[UUID, str], param: Literal["id", "title", "body", "tags"], session: Session) -> Union[Sequence[Post], Post, None]:
    if not param == "id" and isinstance(query, str):
        words = query.split()
        if param == "title":
            filters = [Post.title.ilike(f"%{word}%") for word in words]             # type: ignore
        if param == "tags":
            filters = [Post.tags.ilike(f"%{word}%") for word in words]              # type: ignore
        if param == "body":
            filters = [Post.body.ilike(f"%{word}%") for word in words]              # type: ignore
        
        posts = session.exec(select(Post).where(or_(*filters))).all()
    else:
        posts = session.get(Post, query)

    return posts


async def authenticate_user(username: str, password: str, session: Session) -> Union[User, Literal[False]]:
    user = await get_user(username, "username", session)
    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user