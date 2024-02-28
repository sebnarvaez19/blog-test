import { useFetchPostsByTag } from "../hooks/fetchData";
import TagFilter from "./TagFilter";
import UserFilter from "./UserFilter";

export default function FiltersPannel() {
    const posts = useFetchPostsByTag("all")

    return (
        <div className="grid">
            <div className="s12">
                <TagFilter posts={posts}/>
            </div>
            <div className="s12">
                <UserFilter posts={posts}/>
            </div>
        </div>
    )
}
