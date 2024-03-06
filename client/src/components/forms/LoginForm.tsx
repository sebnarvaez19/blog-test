import { Box, Button, Grid } from "@mui/material"
import React, { Dispatch, FormEventHandler, SetStateAction } from "react"
import UsernameField from "../form_fields/UsernameField"
import PasswordField from "../form_fields/passwordField"

interface LoginFormProps {
    username: string | null,
    usernameHandler: Dispatch<SetStateAction<string>>,
    password: string | null,
    passwordHandler: Dispatch<SetStateAction<string>>,
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const LoginForm: React.FC<LoginFormProps> = ({ username, usernameHandler, password, passwordHandler, handleSubmit }) => {
    return (
        <Box margin="5vw">
            <form method="POST" onSubmit={handleSubmit}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <UsernameField username={username} usernameHandler={usernameHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField password={password} passwordHandler={passwordHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default LoginForm
