import React from "react";
import Feed from "../components/Feed";
import FiltersPannel from "../components/FiltersPannel";
import RecentPannel from "../components/RecentPannel";
import { useFechtPosts } from "../hooks/fetchData";
import { Post } from "../types";
import NewPostButton from "../components/NewPostButton";
import { useAuth } from "../auth/AuthProvider";

const Index: React.FC = () => {
    const [posts, setPosts] = useFechtPosts()
    const authUser = useAuth()

    return (
        <div className="grid">
            <div className="s3 center-align">
                <FiltersPannel posts={posts as Post[]} setPosts={setPosts} />
            </div>
            <div className="s6 center-align">
                {authUser.authenticated && (
                    <NewPostButton/>
                )}
                <Feed posts={posts as Post[]} />
            </div>
            <div className="s3 center-align">
                <RecentPannel posts={posts as Post[]}/>
            </div>
        </div>
    )
}

export default Index
