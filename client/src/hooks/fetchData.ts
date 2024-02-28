import { User } from "../types";
import { useEffect, useState } from "react";
import { getUser } from "../logic";

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
