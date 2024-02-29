import { createContext, useContext, useState } from "react"

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthContext = createContext({
    authenticated: false,
})

const Authprovider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated,] = useState(true)

    return (
        <AuthContext.Provider value={{ authenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Authprovider
export const useAuth = () => useContext(AuthContext) 
