import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

const BackButton: React.FC = () => {
    const navigate = useNavigate()
    
    return (
        <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
        </IconButton>
    )
}

export default BackButton
