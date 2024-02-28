import { useFetchUsersByPost } from "../hooks/fetchData";
import { FeedProps } from "../types";
import UserRow from "./UserRow";

const UserFilter: React.FC<FeedProps> = ({ posts }) => {
    const users = useFetchUsersByPost(posts)

    return (
        <article className="fill">
            <div className="grid center-align middle-align">
                <div className="s12">
                    <h6>Filter by user</h6>
                </div>
                {users.map((user) => (
                    <UserRow key={user.userId} user={user}/>
                ))}
            </div>
        </article>       
    )
}

export default UserFilter
