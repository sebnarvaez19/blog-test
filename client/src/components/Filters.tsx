import React, { useCallback, useContext, useState } from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import TagsField from "./form_fields/TagsField"
import PostContext from "../contexts/PostContext"
import { getPosts, searchPosts } from "../logic"
import TagsArray from "./filters/TagsArray"

const Filters: React.FC = () => {
    const { setPosts } = useContext(PostContext)
    const [tags, setTags] = useState<string>("")

    const submitHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const filteredPosts = tags ? await searchPosts(tags, "tags") : await getPosts()
        setPosts(filteredPosts)
    }, [tags, setPosts])


    return (
        <form method="GET" onSubmit={submitHandler}>
        <Card variant="outlined" sx={{width: `${2.9/12*100}vw`}}>
            <CardContent>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Filter by tags
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TagsField tags={tags} setTags={setTags} width="auto"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TagsArray />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </form>
    )
}

export default Filters
