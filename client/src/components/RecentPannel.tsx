import { Post } from "../types";
import MiniPost from "./MiniPost";

const RecentPannel: React.FC<{ posts: Post[] }> = ({ posts }) => {    
    return (
        <article className="fill">
            <div className="grid">
                <div className="s12">
                    <h6>Recent activity</h6>
                </div>
                {posts.slice(0, 5).map((post) => (
                    <div className="s12 center-align middle-align">
                        <MiniPost post={post}/>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default RecentPannel
