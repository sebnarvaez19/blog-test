import React from "react"
import { useLoaderData } from "react-router-dom"
import PostEntry from "../components/post_variants/PostEntry"
import { Grid } from "@mui/material"
import BackButton from "../components/buttons/BackButton"
import { PostProps } from "../types"
import CommentArray from "../components/comments/CommentsArray"
import CommentSection from "../components/auth_required/CommentSection"

const PostPage: React.FC = () => {
    const post = useLoaderData() as PostProps
    
    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item xs={2} container justifyContent="flex-end">
                <BackButton />
            </Grid>
            <Grid item xs={8}>
                <PostEntry post={post}/>
                <br />
                <CommentArray comments={post.comments}/>
                <br />
                <CommentSection postId={post.id}/>
            </Grid>
        </Grid>
    )
}

export default PostPage
