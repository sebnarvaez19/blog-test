import { Avatar, Card, CardActionArea, Grid, Typography } from "@mui/material"
import PostContext from "../../contexts/PostContext"
import React, { useCallback, useContext } from "react"
import { searchPosts } from "../../logic"

interface TagLineProps {
    tagName: string,
    tagCount: number
}

const TagLine: React.FC<TagLineProps> = ({ tagName, tagCount }) => {
    const { setPosts } = useContext(PostContext)
    
    const clickHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const filteredPosts = await searchPosts(tagName, "tags")
        setPosts(filteredPosts)
    }, [tagName, setPosts])

    return (
        <Card variant="outlined" sx={{margin: "1vh 0"}}>
            <CardActionArea onClick={clickHandler}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="body1">
                        {tagName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">
                        <Avatar variant="rounded">{tagCount}</Avatar>
                    </Typography>
                </Grid>
            </Grid>
            </CardActionArea>
        </Card>
    )
}

export default TagLine
