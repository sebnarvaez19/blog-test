import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Box, Link, Typography } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage"
import LoginForm from "../components/forms/LoginForm"
import { Navigate } from "react-router-dom"
import { submitLogin } from "../logic"


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { token, setToken } = useContext(UserContext)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        submitLogin({ username, password, setErrorMessage, setToken })
    }

    return (
        <>
            {token && <Navigate to="/" replace={true} state={token} />}
            <LoginForm
                username={username}
                usernameHandler={setUsername}
                password={password}
                passwordHandler={setPassword}
                handleSubmit={handleSubmit}
            />
            <Box display="flex" alignItems="center" justifyContent="center" minWidth="100">
                <Typography variant="caption">
                    If you don't have an account <Link href="/register">Register</Link>
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" minWidth="100" margin="2vh">
                <ErrorMessage message={errorMessage} />
            </Box>
        </>
    )
}

export default LoginPage
