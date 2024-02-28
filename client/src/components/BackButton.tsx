import React from "react"
import { useNavigate } from "react-router-dom"

export const BackButton: React.FC = () => {
    const navigate = useNavigate()

    return (
        <button className="circle transparent" onClick={() => {navigate(-1)}}>
            <i>arrow_back</i>
        </button>
    )
}
