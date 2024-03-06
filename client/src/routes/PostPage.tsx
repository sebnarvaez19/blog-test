import React from "react"
import { useLoaderData } from "react-router-dom"
import PostEntry from "../components/post_variants/PostEntry"
import { Grid } from "@mui/material"
import BackButton from "../components/buttons/BackButton"

const PostPage: React.FC = () => {
    const post = useLoaderData()
    
    return (
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
            <Grid item xs={3} container justifyContent="flex-end">
                <BackButton />
            </Grid>
            <Grid item xs={6}>
                <PostEntry post={post}/>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    )
}

export default PostPage
