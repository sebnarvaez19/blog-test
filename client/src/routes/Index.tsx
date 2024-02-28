import Feed from "../components/Feed";
import FiltersPannel from "../components/FiltersPannel";
import RecentPannel from "../components/RecentPannel";
import { useFechtPosts } from "../hooks/fetchData";

export default function Index() {
    const [posts, setPosts] = useFechtPosts()

    return (
        <>
            <div className="grid">
                <div className="s3 border center-align">
                    <FiltersPannel posts={posts} setPosts={setPosts} />
                </div>
                <div className="s6 border center align">
                    <Feed posts={posts} />
                </div>
                <div className="s3 border center align">
                    <RecentPannel />
                </div>
            </div>
        </>
    )
}
