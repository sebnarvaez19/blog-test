import { getPosts } from "../logic";
import { RemoveFiltersProps } from "../types";

const RemoveFilter: React.FC<RemoveFiltersProps> = ({ setPosts, setFiltered }) => {
    async function restorePosts() {
        const posts = await getPosts()
        
        setPosts(posts)
        setFiltered(false)
    }
    
    return (
        <div className="s12">
            <button className="secondary round" onClick={() => {
                restorePosts()
            }}>
                Remove filters? <i>close</i>
            </button>
        </div>
    )
}

export default RemoveFilter
