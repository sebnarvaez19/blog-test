export type User = {
    id?: string,
    name?: string,
    username: string,
    email: string,
    bio?: string,
    createdAt: string
}

export type Post = {
    id?: string,
    title: string,
    body: string,
    tags: string,
    createdAt?: string,
    userId?: string
}
