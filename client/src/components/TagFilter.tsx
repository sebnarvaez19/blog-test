import { useFetchTagsByPost } from "../hooks/fetchData";
import { getPostsByTags } from "../logic";
import { FilterProps } from "../types";
import TagRow from "./TagRow";

const TagFilter: React.FC<FilterProps> = ({ posts, setPosts, setFiltered }) => {
    const tags = useFetchTagsByPost(posts)

    async function clickHandle(tags: string) {
        const data = await getPostsByTags(tags)

        setFiltered(true)
        setPosts(data)
    }

    return (
        <article className="fill">
            <div className="grid center-align middle-align">
                <div className="s12">
                    <h6>Filter by tag</h6>
                </div>
                {tags.map((tag) => (
                    <TagRow key={tag[0]} tag={tag} clickHandle={clickHandle}/>
                ))}
            </div>
        </article>
    )
}

export default TagFilter
