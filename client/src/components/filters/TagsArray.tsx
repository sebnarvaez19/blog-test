import React, { useContext } from "react"
import PostContext from "../../contexts/PostContext"
import TagLine from "./TagLine"

const TagsArray: React.FC = () => {
    const { posts } = useContext(PostContext)
    const allTags = posts.map((post) => post.tags).join().split(",")

    // console.log(allTags)

    const counts = allTags.reduce((acc, value) => {
        if (!acc[value]) {
            acc[value] = 0;
        }
        acc[value]++;
        return acc;
    }, {});
    
    const sortedEntries = Object.entries(counts).sort(([, countA], [, countB]) => countB - countA)
    const topEntries = sortedEntries.slice(0, 5)
    
    return (
        <>
            {topEntries.map((tag) => (<TagLine tagName={tag[0]} tagCount={tag[1]}/>))}
        </>
    )
}

export default TagsArray
