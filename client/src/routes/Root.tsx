import React from "react"
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import HeaderBar from "../components/HeaderBar"

const Root: React.FC = () => {
    return (
        <>
            <HeaderBar />
            <Box margin={"10px"}>
                <Outlet />
            </Box>
        </>
    )
}

export default Root
