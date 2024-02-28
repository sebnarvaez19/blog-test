import { FeedProps } from "../types";
import TagRow from "./TagRow";
import TagSearch from "./TagSearch";

const TagFilter: React.FC<FeedProps> = ({ posts }) => {
    const countMap: Map<string, number> = new Map();

    const tagsArray = posts.map((post) => {return post.tags}).join().split(",")

    tagsArray.forEach((item) => {
    const existingCount = countMap.get(item);
    countMap.set(item, existingCount ? existingCount + 1 : 1);
    });

    const tagsSet = Array.from(countMap.entries()).sort((a, b) => b[1] - a[1])
    const topThreeTags = tagsSet.slice(0, 3)

    console.log(topThreeTags)

    return (
        <article className="fill">
            <div className="grid center-align middle-align">
                <TagSearch />
                {topThreeTags.map((tag) => (
                    <TagRow key={tag[0]} tag={tag} />
                ))}
            </div>
        </article>
    )
}

export default TagFilter
