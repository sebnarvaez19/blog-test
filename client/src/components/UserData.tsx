import React from "react";
import { UserProps } from "../types";
import moment from "moment";

export const UserData: React.FC<UserProps> = ({ user }) => {
    const date = moment(user.created_at as string).fromNow()

    return (
        <div className="grid">
            <div className="s12">
                <div className="grid">
                    <div className="s6">
                        <img
                        className="circle extra"
                        src="https://placekitten.com/200/200"
                        style={{width: 200, height: 200}}
                        />
                    </div>
                    <div className="s6 middle-align">
                        <div className="center">
                            <h5>{user.username}</h5>
                            <br />
                            <p className="small-text">{user.name}</p>
                            <p className="small-text">{user.email}</p>
                            <br />
                            <p className="small-text">Active since: {date}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="s12">
                {user.bio}
            </div>
            <br />
        </div>
    )
}