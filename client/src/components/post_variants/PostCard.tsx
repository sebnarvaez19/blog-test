import { Link, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import React from "react"
import { PostProps } from "../../types"
import moment from "moment"

const PostCard: React.FC<PostProps> = ({ post }) => {
    const tagArray = post.tags.split(",")
    const date = moment(post.created_at).fromNow()

    return (
        <Link href={`/posts/${post.id}`} underline="none">
            <Card variant="outlined" sx={{marginBottom: "10px"}}>
                <CardActionArea>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm container justifyContent="space-evenly" alignItems="center">
                                <Grid item style={{marginRight: "auto"}}>
                                    <Typography variant="h5">{post.title}</Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "auto"}}>
                                    <Typography variant="caption">{date}</Typography>
                                </Grid>
                            </Grid>
                            {post.author && (
                                <Grid item xs={12}>
                                <Typography variant="subtitle1">@{post.author.username}</Typography>
                            </Grid>
                            )}
                            <Grid  item xs={12}>
                                {post.body.length > 150 ? (
                                    <Typography variant="body1">{post.body.slice(0, 150) + "..."}</Typography>
                                ) : (
                                    <Typography variant="body1">{post.body}</Typography>
                                )}
                            </Grid>
                            <Grid  item xs={12} sm container spacing={1}>
                                {tagArray.map((tag) => (
                                    <Grid key={tag} item>
                                        <Typography variant="caption">{tag}</Typography>    
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default PostCard
