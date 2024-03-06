import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Box, Link, Typography } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage"
import RegisterForm from "../components/forms/RegisterForm"
import { Navigate } from "react-router-dom"
import { submitRegister } from "../logic"

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { token, setToken } = useContext(UserContext)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        submitRegister({ username, email, password, setErrorMessage, setToken })
    }

    return (
        <>
            {token && <Navigate to="/" replace={true} state={token} />}
            <RegisterForm
                username={username}
                usernameHandler={setUsername}
                email={email}
                emailHandler={setEmail}
                password={password}
                passwordHandler={setPassword}
                handleSubmit={handleSubmit}
            />
            <Box display="flex" alignItems="center" justifyContent="center" minWidth="100">
                <Typography variant="caption">
                    If you have an account <Link href="/login">Login</Link>
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" minWidth="100" margin="2vw">
                <ErrorMessage message={errorMessage}/>
            </Box>
        </>
    )
}

export default RegisterPage
