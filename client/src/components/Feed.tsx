import { Box, Typography } from "@mui/material"
import React from "react"
import PostCard from "./post_variants/PostCard"
import { FeedProps } from "../types"

const Feed: React.FC<FeedProps> = ({ posts }) => {
    return (
        <Box>
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" minWidth="100">
                    <Typography variant="body2">
                        There are no posts 😢
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default Feed
