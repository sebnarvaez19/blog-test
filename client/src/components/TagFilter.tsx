import { useFetchTagsByPost } from "../hooks/fetchData";
import { FeedProps } from "../types";
import TagRow from "./TagRow";

const TagFilter: React.FC<FeedProps> = ({ posts }) => {
    const tags = useFetchTagsByPost(posts)

    return (
        <article className="fill">
            <div className="grid center-align middle-align">
                <div className="s12">
                    <h6>Filter by tag</h6>
                </div>
                {tags.map((tag) => (
                    <TagRow key={tag[0]} tag={tag} />
                ))}
            </div>
        </article>
    )
}

export default TagFilter
