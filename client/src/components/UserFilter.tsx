import { useFetchUsersByPost } from "../hooks/fetchData";
import { FilterProps } from "../types";
import UserRow from "./UserRow";
import { getPostsByUser } from "../logic";

const UserFilter: React.FC<FilterProps> = ({ posts, setPosts, setFiltered }) => {
    const users = useFetchUsersByPost(posts)

    async function clickHandle(userId: string) {
        const data = await getPostsByUser(userId)

        setFiltered(true)
        setPosts(data)
    }

    return (
        <article className="fill">
            <div className="grid center-align middle-align">
                <div className="s12">
                    <h6>Filter by user</h6>
                </div>
                {users.map((user) => (
                    <UserRow key={user.userId} user={user} clickHandle={clickHandle}/>
                ))}
            </div>
        </article>       
    )
}

export default UserFilter
