import React from "react"
import { useLoaderData } from "react-router-dom"
import Feed from "../components/Feed"
import { Grid } from "@mui/material"
import UserInfo from "../components/UserInfo"
import BackButton from "../components/buttons/BackButton"

const UserPage: React.FC = () => {
    const user = useLoaderData()

    console.log(user)
    return (
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
            <Grid item xs={3} container justifyContent="flex-end">
                <BackButton />
            </Grid>
            <Grid item xs={6} sm container spacing={2}>
                <Grid item xs={12}>
                    <UserInfo user={user} />
                </Grid>
                <Grid item xs={12}>
                    <Feed posts={user.posts}/>
                </Grid>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    )
}

export default UserPage
