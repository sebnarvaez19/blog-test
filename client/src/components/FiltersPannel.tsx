import React from "react";
import TagFilter from "./TagFilter";
import UserFilter from "./UserFilter";
import { FilterProps } from "../types";

const FiltersPannel: React.FC<FilterProps> = ({ posts, setPosts }) => {
    return (
        <div className="grid">
            <div className="s12">
                <TagFilter posts={posts} setPosts={setPosts}/>
            </div>
            <div className="s12">
                <UserFilter posts={posts} setPosts={setPosts}/>
            </div>
        </div>
    )
}

export default FiltersPannel
