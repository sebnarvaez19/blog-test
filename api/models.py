from datetime import datetime
from zoneinfo import ZoneInfo
from typing import List, Optional
from uuid import UUID, uuid4

from passlib.hash import bcrypt

from sqlmodel import SQLModel, Field, Relationship


def colombia_time_now():
    return datetime.now(ZoneInfo("America/Bogota"))


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True)


class User(UserBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=colombia_time_now)
    posts: List["Post"] = Relationship(back_populates=("author"))

    def verify_password(self, plain_password):
        return bcrypt.verify(plain_password, self.hashed_password)
    

class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: UUID
    created_at: datetime


class UserReadWithPosts(UserRead):
    posts: List["Post"]


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


class PostBase(SQLModel):
    title: str
    body: str
    tags: str


class Post(PostBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=colombia_time_now)
    author_id: UUID = Field(foreign_key="user.id")
    author: User = Relationship(back_populates="posts")


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: UUID
    created_at: datetime
    author_id: UUID


class PostReadWithUser(PostRead):
    author: User


class PostUpdate(SQLModel):
    title: Optional[str] = None
    body: Optional[str] = None
    tags: Optional[str] = None
