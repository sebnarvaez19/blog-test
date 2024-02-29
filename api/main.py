from contextlib import asynccontextmanager
from typing import List, Optional
from uuid import UUID

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, column

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
    return {"message": "Hi, This is the API for test-blog go to the /docs/ path to read how to use it"}


@app.get("/users/", response_model=List[User])
async def read_users(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    """Get a list of user.

    Parameters
    ----------
        limit: int, optional
            How many users to get, by default 0 (get all users).
        offset: int, optional
            How many users to pass, by default 0 (do not pass any user).

    Returns
    -------
        A list of users.
    """
    query = select(User)
    if limit:
        query = query.limit(limit)

    if offset:
        query = query.offset(offset)
    
    users = session.exec(query).all()

    return users


@app.post("/users/", response_model=User)
async def create_user(*, session: Session = Depends(get_session), user: User):
    """Create an user.

    Parameters
    ----------
        user: User
            The user to created, the parameters
            username and email must be defined.

    Returns
    -------
        The user created.
    """
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return db_user


@app.get("/users/{user_id}", response_model=User)
async def read_user(*, session: Session = Depends(get_session), user_id: UUID):
    """Get an user by UUID.

    Parameters
    ----------
        post_id: UUID
            The UUID of the user to find.

    Returns
    -------
        The user to find.

    Raises
    ------
        HTTPException
            If the user is not found.
    """
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user


@app.patch("/users/{user_id}", response_model=User)
async def update_user(*, session: Session = Depends(get_session), user_id: UUID, user: User):
    """Update an user find it by UUID.

    Parameters
    ----------
        user_id: UUID
            The UUID of user to update.

    Returns
    -------
        The user updated.

    Raises
    ------
        HTTPException
            If the user is not found.
    """
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
    """Delete an user by UUID.

    Parameters
    ----------
        user_id: UUID
            The UUID of the user to delete.

    Raises
    ------
        HTTPException
            If the user is not found.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(user)
    session.commit()

    return {"ok": True}


@app.get("/posts/", response_model=List[Post])
async def read_posts(*, session: Session = Depends(get_session), limit: int = 0, offset: int = 0):
    """Get a list of posts.

    Parameters
    ----------
        limit: int, optional
            How many posts to get, by default 0 (get all posts).
        offset: int, optional
            How many posts to pass, by default 0 (do not pass any post).

    Returns
    -------
        A list of posts.
    """
    query = select(Post).order_by(column("created_at").desc())
    if limit:
        query = query.limit(limit)

    if offset:
        query = query.offset(offset)

    posts = session.exec(query).all()

    return posts


@app.post("/posts/", response_model=Post)
async def create_post(*, session: Session = Depends(get_session), post: Post):
    """Create a post.

    Parameters
    ----------
        post: Post
            The post to created, the parameters
            title, body, tags, and user_id must be defined.

    Returns
    -------
        The post created.
    """
    db_post = Post.model_validate(post)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.get("/posts/{post_id}", response_model=Post)
async def read_post(*, session: Session = Depends(get_session), post_id: UUID):
    """Get a post by UUID.

    Parameters
    ----------
        post_id: UUID
            The UUID of the post to find.

    Returns
    -------
        The post to find.

    Raises
    ------
        HTTPException
            If the post is not found.
    """
    db_post = session.get(Post, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return db_post


@app.patch("/posts/{post_id}", response_model=Post)
async def update_post(*, session: Session = Depends(get_session), post_id: UUID, post: Post):
    """Update a post find it by UUID.

    Parameters
    ----------
        post_id: UUID
            The UUID of post to update.

    Returns
    -------
        The post updated.

    Raises
    ------
        HTTPException
            If the post is not found.
    """
    db_post = session.get(Post, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")

    post_data = post.model_dump(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)

    return db_post


@app.delete("/posts/{post_id}")
async def delete_post(*, session: Session = Depends(get_session), post_id: UUID):
    """Delete a post by UUID.

    Parameters
    ----------
        post_id: UUID
            The UUID of the post to delete.

    Raises
    ------
        HTTPException
            If the post is not found.
    """
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    session.delete(post)
    session.commit()

    return {"ok": True}


@app.get("/users/{user_id}/posts/", response_model=List[Post])
async def read_user_posts(*, session: Session = Depends(get_session), user_id: UUID):
    """Get all posts for a given user.

    Parameters
    ----------
        user_id: UUID
            The UUID of the user to get posts for.

    Returns
    -------
        A list of Post objects.

    Raises
    ------
        HTTPException
            If the user is not found.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    posts = session.exec(select(Post).where(Post.user_id == user.id)).all()

    return posts


@app.get("/posts/tags/{tags}", response_model=List[Post])
async def read_posts_by_tags(*, session: Session = Depends(get_session), tags: str):
    """
    Read posts by tags.

    Parameters
    ----------
    tags: str
        The tags to search for. Multiple tags can be provided separated by a comma.

    Returns
    -------
    List[Post]
        The posts with the given tags.
    """
    query = select(Post)
    
    if tags != "all": 
        list_of_tags = [tag[1:] if tag[0] == " " else tag for tag in tags.split(",")]
        for tag in list_of_tags:
            query = query.filter(column("tags").contains(tag))

    posts = session.exec(query).all()

    return posts
