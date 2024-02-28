import { Post, User, useFetchUsersByPostProps } from "../types";
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


export function useFetchTagsByPost(posts: Post[]) {
    const [tags, setTags] = useState<[string, number][]>([])

    useEffect(() => {
        function findTags(posts: Post[]) {
            const PostTagsCounts: Map<string, number> = new Map()

            const tagsArray = posts.map((post) => {return post.tags}).join().split(",")

            tagsArray.forEach((item) => {
                const existingCount = PostTagsCounts.get(item)
                PostTagsCounts.set(item, existingCount ? existingCount + 1 : 1)
            })

            const tagsSet = Array.from(PostTagsCounts.entries()).sort((a, b) => b[1] - a[1])
            const topThreeTags = tagsSet.slice(0, 3)

            setTags(topThreeTags)
        }

        findTags(posts)
    }, [posts])

    return tags
}

export function useFetchUsersByPost(posts: Post[]) {
    const [users, setUsers] = useState<useFetchUsersByPostProps[]>([])

    useEffect(() => {
        async function findusers(posts: Post[]) {
            const userPostCounts: Map<string, number> = new Map()

            posts.forEach((post) => {
                const userId = post.user_id as string
                const existingCount = userPostCounts.get(userId) || 0
                userPostCounts.set(userId, existingCount + 1)
            })

            const sortedEntries = Array.from(userPostCounts.entries()).sort((a, b) => b[1] - a[1])

            const topThreeUsersWithUsernames = await Promise.all(
                sortedEntries.slice(0, 3).map(async ([userId, count]) => {
                  const user = await getUser(userId);
                  return { userId, username: user.username, postCount: count };
                })
              )

            setUsers(topThreeUsersWithUsernames)
        }

        findusers(posts)
    }, [posts])

    return users
}