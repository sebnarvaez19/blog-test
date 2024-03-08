import { useEffect, useState } from "react"
import { PostProps } from "../types"
import { getPosts } from "../logic"

export function useFechtPosts() {
    const [posts, setPosts] = useState<PostProps[]>([])

    useEffect(() => {
        async function findPosts() {
            const data = await getPosts()
            setPosts(data)
        }

        findPosts()
    }, [])

    return { posts, setPosts }
}