import React from "react"
import { CommentProps } from "../../types"
import { Card, CardContent, Grid, Link, Typography } from "@mui/material"
import moment from "moment"

const CommentArray: React.FC<CommentProps[]> = ({ comments }) => {
    return (
        <Card variant="outlined" sx={{maxHeight: "30vh", overflow: "auto"}}>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    {comments.map((comment) => (
                        <Grid key={comment.id} item>
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <Typography variant="caption">
                                                    <Link href={`/users/${comment.author.id}`} underline="hover">
                                                        @{comment.author.username}
                                                    </Link>    
                                                </Typography>
                                            </Grid>
                                            <Grid item><Typography variant="caption">{moment(comment.created_at).fromNow()}</Typography></Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">{comment.body}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CommentArray
