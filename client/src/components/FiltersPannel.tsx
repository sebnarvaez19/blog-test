import React from "react";
import TagFilter from "./TagFilter";
import UserFilter from "./UserFilter";
import { FiltersPannelProps } from "../types";
import { useFilterState } from "../hooks/states";
import RemoveFilter from "./RemoveFilter";

const FiltersPannel: React.FC<FiltersPannelProps> = ({ posts, setPosts }) => {
    const [filtered, setFiltered] = useFilterState()

    return (
        <div className="grid">
            {filtered && (
                <RemoveFilter setPosts={setPosts} setFiltered={setFiltered}/>
            )}
            <div className="s12">
                <TagFilter posts={posts} setPosts={setPosts} setFiltered={setFiltered}/>
            </div>
            <div className="s12">
                <UserFilter posts={posts} setPosts={setPosts} setFiltered={setFiltered}/>
            </div>
        </div>
    )
}

export default FiltersPannel
