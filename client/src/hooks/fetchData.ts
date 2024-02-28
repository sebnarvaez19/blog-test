import { Post, User } from "../types";
import { useEffect, useState } from "react";
import { getPostsByTags, getPostsByUser, getUser } from "../logic";

export function useFetchUser(userId: string) {
    const [user, setUser] = useState<User>({
        username: "Testing Boy",
        email: "test@email.com",
        created_at: "27/02/2024"
    })
    
    useEffect(() => {
        async function findUser(userId: string) {
            const data = await getUser(userId)
            setUser(data)
        }
    
        findUser(userId)
    }, [userId])
    
    return user
}

export function useFecthPostsByUser(userId: string) {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function findPosts(userId: string) {
            const data = await getPostsByUser(userId)
            setPosts(data)
        }

        findPosts(userId)
    }, [userId])

    return posts
}

export function useFetchPostsByTag(tags: string) {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function findPosts(tags: string) {
            const data = await getPostsByTags(tags)
            setPosts(data)
        }

        findPosts(tags)
    }, [tags])

    return posts
}
