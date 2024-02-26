from datetime import date
from typing import Optional, List
from uuid import UUID, uuid4

from sqlmodel import SQLModel, Field, Relationship


class Post(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    title: str
    body: str
    tags: str
    created_at: Optional[date] = Field(default_factory=date.today, index=True)
    user_id: UUID = Field(foreign_key="user.id")


class User(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    name: Optional[str]
    username: str
    email: str
    bio: Optional[str]
    created_at: Optional[date] = Field(default_factory=date.today, index=True)
