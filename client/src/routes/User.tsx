import React from "react";
import { BackButton } from "../components/BackButton";
import { useLoaderData } from "react-router-dom";
import { UserData } from "../components/UserData";

export const User: React.FC = () => {
    const user = useLoaderData()
    
    return (
        <>
            <div className="grid">
                <div className="s3 right-align">
                    <BackButton />
                </div>
                <div className="s6 center-align">
                    <UserData user={user} />
                </div>
                <div className="s3"></div>
            </div>
        </>
    )
}