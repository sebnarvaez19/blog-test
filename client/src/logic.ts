import { User, Post } from "./types"

const userAPI: string = "http://127.0.0.1:8000/users/"
const postAPI: string = "http://127.0.0.1:8000/posts/"

export async function getUsers(): Promise<User[]> {
    const response = await fetch(userAPI)
    const data = await response.json()

    return data
}

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(postAPI)
    const data = await response.json()

    return data
}

export async function getUser(userId: string): Promise<User> {
    const response = await fetch(userAPI + `${userId}`)
    const data = await response.json()

    return data
}

export async function getPost(postId: string): Promise<Post> {
    const response = await fetch(postAPI + `${postId}`)
    const data = await response.json()

    return data
}

export async function getPostsByUser(userId: string): Promise<Post[]> {
    const response = await fetch(userAPI + `${userId}/posts/`)
    const data = await response.json()

    return data
}
