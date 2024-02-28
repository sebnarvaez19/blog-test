import { PostCardProps } from "../types";
import { useFetchUser } from "../hooks/fetchData";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const user = useFetchUser(post.user_id as string)
    const tagArray = post.tags.split(",")
    const date = moment(post.created_at as string).fromNow()

    return (
        <Link to={`/posts/${post.id}`}>
            <article className="fill">
                <div className="grid">
                    <div className="s9 left-align"><h5>{post.title}</h5></div>
                    <div className="s3 right-align"><span className="small-text">{date}</span></div>
                    <div className="s12 left-align"><span className="small-text">{user.username}</span></div>
                    <div className="s12 left-align">{post.body.slice(0,100) + "..."}</div>
                    <div className="s12 left-align">
                        {tagArray.map((tag: string) => (
                            <a key={tag} className="chip secondary round">{tag}</a>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default PostCard
