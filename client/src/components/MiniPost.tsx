import moment from "moment";
import { Post } from "../types";
import { Link } from "react-router-dom";

const MiniPost: React.FC<{ post: Post }> = ({ post }) => {
    const date = moment(post.created_at as string).fromNow()
    
    return (
        <>
        <Link to={`posts/${post.id}`}>
            <article className="tertiary">
                <div className="grid">
                    <div className="s8 left-align middle-align">
                        {post.title.slice(0, 20) + "..."}
                    </div>
                    <div className="s4 right-align middle-align">
                        <span className="small-text">
                            {date}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
        </>
    )
}

export default MiniPost
