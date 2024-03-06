import React from "react"
import { PostProps } from "../../types"
import { Card, CardContent, Grid, Link, Typography } from "@mui/material"
import moment from "moment"

const PostEntry: React.FC<PostProps> = ({ post }) => {
    const tagArray = post.tags.split(",")
    const bodyArray = post.body.split("\n")
    const date = moment(post.created_at).fromNow()

    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container direction="column" spacing={1}>
                    <Grid item xs={12} sm container justifyContent="space-evenly" alignItems="center">
                        <Grid item style={{marginRight: "auto"}}>
                            <Typography variant="h4">{post.title}</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: "auto"}}>
                            <Typography variant="caption">{date}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Link href={`/users/${post.author_id}`} underline="none" color="inherit">
                            <Typography variant="subtitle1">By: @{post.author.username}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm container spacing={1}>
                        {tagArray.map((tag, i) => (
                            <Grid key={i} item>
                                <Link href="#" underline="none">
                                    <Typography variant="caption">{tag}</Typography>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        {bodyArray.map((line, i) => (
                            <React.Fragment key={i}>
                                {line !== "" ? <Typography variant="body1">{line}</Typography> : <br />}
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PostEntry
