import { Grid } from "@mui/material"
import React, { useContext } from "react"
import Filters from "../components/Filters"
import Feed from "../components/Feed"
import LoginOrAdd from "../components/auth_required/LoginOrAdd"
import PostContext from "../contexts/PostContext"

const Index: React.FC = () => {
    const { posts } = useContext(PostContext)
    
    return (
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
            <Grid item xs={3} container justifyContent="flex-end">
                <Filters />
            </Grid>
            <Grid item xs={6}>
                <LoginOrAdd />
                <Feed posts={posts}/>
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

export default Index
