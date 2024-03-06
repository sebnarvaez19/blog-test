from typing import Optional, Union, Literal
from uuid import UUID

import jwt

from sqlmodel import Session, select

from pydantic import BaseModel

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


async def get_user_by_id(user_id: UUID, session: Session) -> Optional[User]:
    user = session.get(User, user_id)

    return user


async def get_user_by_username(username: str, session: Session) -> Optional[User]:
    query = select(User).where(User.username == username)
    user = session.exec(query).one_or_none()

    return user


async def get_user_by_email(email: str, session: Session) -> Optional[User]:
    query = select(User).where(User.email == email)
    user = session.exec(query).one_or_none()

    return user


async def authenticate_user(username: str, password: str, session: Session) -> Union[User, Literal[False]]:
    user = await get_user_by_username(username, session)
    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user


async def get_post_by_id(post_id: UUID, session: Session):
    post = session.get(Post, post_id)

    return post