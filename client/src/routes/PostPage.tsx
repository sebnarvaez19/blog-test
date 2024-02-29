import React from "react";
import { useLoaderData } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { PostData } from "../components/PostData";
import { Post } from "../types";

export const PostPage: React.FC = () => {
    const post = useLoaderData()

    return (
        <>
            <div className="grid">
                <div className="s3 right-align">
                    <BackButton />
                </div>
                <div className="s6 center-align">
                    <PostData post={post as Post} />
                </div>
                <div className="s3"></div>
            </div>
        </>
    )
}
