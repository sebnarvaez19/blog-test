import { Grid } from "@mui/material"
import React from "react"
import Filters from "../components/Filters"
import Recent from "../components/Recent"
import Feed from "../components/Feed"
import { useFechtPosts } from "../hooks/FetchData"
import LoginOrAdd from "../components/auth_required/LoginOrAdd"

const Index: React.FC = () => {
    const [posts, ] = useFechtPosts()

    return (

        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
            <Grid item xs={3} container justifyContent="flex-end">
                <Filters />
            </Grid>
            <Grid item xs={6}>
                <LoginOrAdd />
                <Feed posts={posts}/>
            </Grid>
            <Grid item xs={3}>
                <Recent />
            </Grid>
        </Grid>
    )
}

export default Index
