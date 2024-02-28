import { UserRowProps } from "../types"

const UserRow: React.FC<UserRowProps> = ({ user, clickHandle }) => {
    return (
        <div className="s12 center-align middle-align">
            <div className="grid center-align middle-align">
               <div className="s1 left-align middle-align"/>
                <div className="s8 left-align middle-align">
                    <div className="max">{user.username}</div>
                </div>
                <div className="s3 right-align middle-align">
                    <a className="chip secondary" onClick={() => clickHandle(user.userId)}>{user.postCount}</a>
                </div>
            </div>
        </div>
    )
}

export default UserRow
