import React, { createContext, useEffect, useState } from "react";


interface UserContextProps {
    token: string | null
    setToken: (newToken: string | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextProps>({ token: null, setToken: () => null })

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    useEffect(() => {
        async function fetchUser() {
            const requestOptions = {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }

            const response = await fetch("/api/users/me", requestOptions)
            if (!response.ok) {
                setToken(null)
                localStorage.removeItem("token")
                
            } else {
                localStorage.setItem("token", token as string)
            }
        }

        fetchUser()

    }, [token])

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}
