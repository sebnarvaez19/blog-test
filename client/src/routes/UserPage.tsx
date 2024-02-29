import React from "react";
import { BackButton } from "../components/BackButton";
import { useLoaderData } from "react-router-dom";
import { UserData } from "../components/UserData";
import { useFecthPostsByUser } from "../hooks/fetchData";
import Feed from "../components/Feed";
import RecentPannel from "../components/RecentPannel";
import { User } from "../types";

export const UserPage: React.FC = () => {
    const user = useLoaderData() as User
    const posts = useFecthPostsByUser(user.id as string)
    
    return (
        <>
            <div className="grid">
                <div className="s3 right-align">
                    <BackButton />
                </div>
                <div className="s6 center-align">
                    <div className="grid">
                        <div className="s12">
                            <UserData user={user} />
                        </div>
                        <div className="s12">
                            {posts.length ? (
                                <div>
                                    <Feed posts={posts} />
                                </div>
                            ) : (
                                <div>No posts done yet 😒</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="s3 center-align">
                    <RecentPannel posts={posts}/>
                </div>
            </div>
        </>
    )
}