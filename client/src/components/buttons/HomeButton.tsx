import { Home } from "@mui/icons-material"
import { IconButton, Link } from "@mui/material"
import React from "react"

const HomeButton: React.FC = () => {
    return (
        <Link href="/">
            <IconButton aria-label="home-button" size="large">
                <Home fontSize="inherit"/>
            </IconButton>
        </Link>
    )
}

export default HomeButton
