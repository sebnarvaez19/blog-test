import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import NewPostButton from "../buttons/NewPostButton"
import LoginButton from "../buttons/LoginButton"

const LoginOrAdd: React.FC = () => {
    const { token } = useContext(UserContext)
    
    return (
        <Box sx={{marginBottom: "10px"}}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item sx={{marginRight: "auto", marginBottom: "-10px"}}>
                            <Typography variant="body2">Something to share?</Typography>
                        </Grid>
                        <Grid item sx={{marginLeft: "auto", marginBottom: "-10px"}}>
                            {token ? (<NewPostButton />) : (<LoginButton />)}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginOrAdd
