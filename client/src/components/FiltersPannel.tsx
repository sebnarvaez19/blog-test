import { useFetchPostsByTag } from "../hooks/fetchData";
import TagFilter from "./TagFilter";

export default function FiltersPannel() {
    const posts = useFetchPostsByTag("all")

    return (
        <>
            <h5>Filters...</h5>
            <div className="grid">
                <div className="s12">
                    <TagFilter posts={posts}/>
                </div>
            </div>
        </>
    )
}
