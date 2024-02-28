export type User = {
    id?: string,
    name?: string,
    username: string,
    email: string,
    bio?: string,
    created_at: string
}

export type Post = {
    id?: string,
    title: string,
    body: string,
    tags: string,
    created_at?: string,
    user_id?: string
}

export type RootLoaderData = {
    posts: Post[],
}


export type PostCardProps = {
    post: Post
}

export type UserProps = {
    user: User
}

export type FeedProps = {
    posts: Post[]
}

export type ParamsProps = {
    params : {
        postId: string
        userId: string
    }
}