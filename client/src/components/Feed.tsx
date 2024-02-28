import React from "react"
import { Post, FeedProps } from "../types"
import PostCard from "./PostCard"

const Feed: React.FC<FeedProps> = ({ posts }) => {
    return (
        <div className="grid">
            {posts.length ? (
                posts.map((post: Post) => (
                    <div key={post.id} className="s12 center-align middle-align">
                        <PostCard post={post} />
                    </div>
                ))
            ) : (
                <div className="s12 center-align middle-align">No posts made</div>
            )}
        </div>
    )
}

export default Feed
