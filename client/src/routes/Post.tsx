import React from "react";
import { useLoaderData } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { PostData } from "../components/PostData";

export const Post: React.FC = () => {
    const post = useLoaderData()
    console.log(post)

    return (
        <>
            <div className="grid">
                <div className="s3 right-align">
                    <BackButton />
                </div>
                <div className="s6 center-align">
                    <PostData post={post} />
                </div>
                <div className="s3"></div>
            </div>
        </>
    )
}