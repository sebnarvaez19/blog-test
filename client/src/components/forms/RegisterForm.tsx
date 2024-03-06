import { Box, Button, Grid } from "@mui/material"
import React, { Dispatch, FormEventHandler, SetStateAction } from "react"
import UsernameField from "../form_fields/UsernameField"
import PasswordField from "../form_fields/passwordField"
import EmailField from "../form_fields/EmailField"

interface RegisterFormProps {
    username: string | null,
    usernameHandler: Dispatch<SetStateAction<string>>,
    email: string | null,
    emailHandler: Dispatch<SetStateAction<string>>,
    password: string | null,
    passwordHandler: Dispatch<SetStateAction<string>>,
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const RegisterForm: React.FC<RegisterFormProps> = ({ username, usernameHandler, email, emailHandler, password, passwordHandler, handleSubmit }) => {
    return (
        <Box margin="5vw">
            <form method="POST" onSubmit={handleSubmit}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <UsernameField username={username} usernameHandler={usernameHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EmailField email={email} emailHandler={emailHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField password={password} passwordHandler={passwordHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default RegisterForm
