import React, { useContext } from "react"
import { UserProps } from "../types"
import { Avatar, Card, CardContent, Grid, Link, Typography } from "@mui/material"
import moment from "moment"
import { UserContext } from "../contexts/UserContext"

const UserInfo: React.FC<UserProps> = ({ user }) => {
    const { token } = useContext(UserContext)
    const date = moment(user.created_at).fromNow()

    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container sm direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item xs={6} container sm direction="column" justifyContent="center" alignItems="center">
                        {user.avatar ? (
                            <Avatar
                                alt={user.username}
                                src={user.avatar}
                                sx={{width: "200px", height: "200px"}}
                            />
                        ) : (
                            <Avatar
                                alt={user.username}
                                sx={{width: "200px", height: "200px"}}
                            ><Typography variant="h1">{user.username.toUpperCase().slice(0, 1)}</Typography></Avatar>
                        )}
                    </Grid>
                    <Grid item xs={6} container sm direction="column" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h4">@{user.username}</Typography>
                        </Grid>
                        {token && (
                            <Grid item xs={12}>
                                <Typography variant="caption"><Link href={`mailto:${user.email}`}>{user.email}</Link></Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography variant="caption">Active since: {date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Here should be a bio.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default UserInfo
