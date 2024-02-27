import Feed from "../components/Feed";
import FiltersPannel from "../components/FiltersPannel";
import RecentPannel from "../components/RecentPannel";

export default function Index() {
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
