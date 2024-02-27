import { useLoaderData } from "react-router-dom";
import Feed from "../components/Feed";
import FiltersPannel from "../components/FiltersPannel";
import RecentPannel from "../components/RecentPannel";
import { RootLoaderData } from "../types";

export default function Index() {
    const { posts } = useLoaderData() as RootLoaderData
    console.log(posts)
    return (
        <>
            <div className="grid">
                <div className="s3 border center-align">
                    <FiltersPannel />
                </div>
                <div className="s6 border center align">
                    <Feed />
                </div>
                <div className="s3 border center align">
                    <RecentPannel />
                </div>
            </div>
        </>
    )
}
