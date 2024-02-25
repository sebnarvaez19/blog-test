from datetime import date
from typing import Optional, List
from uuid import UUID, uuid4

from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    username: str
    email: str


class User(SQLModel, table=True):
    id: Optional[UUID] = Field(default=uuid4(), primary_key=True)
    name: Optional[str] = Field(default=None)
    created_at: Optional[date] = Field(default=date.today(), index=True)


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: UUID
    name: str
    created_at: date


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None


class PostBase(SQLModel):
    title: str = Field(index=True)
    body: str
    user_id: UUID = Field(foreign_key=User.id)


class Post(PostBase, table=True):
    id: Optional[UUID] = Field(default=uuid4(), primary_key=True)
    tags: Optional[List[str]] = Field(default=None)
    created_at: Optional[date] = Field(default=date.today(), index=True)


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: UUID = Field(default=uuid4(), primary_key=True)
    tags: Optional[List[str]] = Field(default=None)
    created_at: date = Field(default=date.today(), index=True)


class PostUpdate(SQLModel):
    title: Optional[str] = None
    body: Optional[str] = None
    tags: Optional[List[str]] = None
