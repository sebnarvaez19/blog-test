import { Post, User } from "../types";
import { useEffect, useState } from "react";
import { getUser } from "../logic";

export function useFetchUserByPost(post: Post) {
    const [user, setUser] = useState<User>({
        username: "Testing Boy",
        email: "test@email.com",
        createdAt: "27/02/2024"
    })
    
    useEffect(() => {
        async function findUser(userId: string) {
            const data = await getUser(userId)
            setUser(data)
        }
    
        findUser(post.userId as string)
    }, [post])
    
    return user
}
