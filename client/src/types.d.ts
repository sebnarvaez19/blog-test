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

export type useFetchUsersByPostProps = {
    userId: string,
    username: string,
    postCount: number
}


export type FilterProps = {
    posts: Post[],
    setPosts: function,
    setFiltered: function
}

export type RemoveFiltersProps = {
    setPosts: function,
    setFiltered: function
}

export type FiltersPannelProps = {
    posts: Post[],
    setPosts: function,
}

export type UserRowProps = {
    user: { userId: string, username: string, postCount: number },
    clickHandle: function
}

export type TagRowProps = {
    tag: [string, number],
    clickHandle: function
}