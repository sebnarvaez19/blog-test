import Feed from "../components/Feed";
import FiltersPannel from "../components/FiltersPannel";
import RecentPannel from "../components/RecentPannel";
import { useFechtPosts } from "../hooks/fetchData";
import { Post } from "../types";

export default function Index() {
    const [posts, setPosts] = useFechtPosts()

    return (
        <>
            <div className="grid">
                <div className="s3 center-align">
                    <FiltersPannel posts={posts as Post[]} setPosts={setPosts} />
                </div>
                <div className="s6 center align">
                    <Feed posts={posts as Post[]} />
                </div>
                <div className="s3 center align">
                    <RecentPannel/>
                </div>
            </div>
        </>
    )
}
