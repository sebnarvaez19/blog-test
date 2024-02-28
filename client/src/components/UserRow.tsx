type UserRowProps = {
    user: { userId: string, username: string, postCount: number }
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    return (
        <div className="s12 center-align middle-align">
            <div className="grid center-align middle-align">
                <div className="s1 left-align middle-align"/>
                <div className="s8 left-align middle-align">
                    <div className="max">{user.username}</div>
                </div>
                <div className="s3 right-align middle-align">
                    <a className="chip secondary">{user.postCount}</a>
                </div>
            </div>
        </div>
    )
}

export default UserRow
