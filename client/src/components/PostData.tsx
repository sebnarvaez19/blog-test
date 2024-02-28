import React from "react";
import { PostCardProps } from "../types";
import { useFetchUser } from "../hooks/fetchData";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostData: React.FC<PostCardProps> = ({ post }) => {
    const user = useFetchUser(post.user_id as string)
    const tagArray = post.tags.split(",")
    const date = moment(post.created_at as string).fromNow()

    return (
        <div className="grid">
            <div className="s9 left-align"><h5>{post.title}</h5></div>
            <div className="s3 right-align"><span className="small-text">{date}</span></div>
            <div className="s12 left-align">
                <Link to={`/users/${post.user_id}`}>{user.name}</Link>
            </div>
            <div className="s12 left-align">
                {tagArray.map((tag) => (
                    <>
                        <span key={tag} className="small-text underline">{tag}</span>
                        <span key={tag + " "}> </span>
                    </>
                ))}
            </div>
            <div className="s12 left-align">
                {post.body}
            </div>
        </div>
    )
}