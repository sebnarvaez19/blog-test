import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { AppBar, Toolbar } from "@mui/material"
import HomeButton from "./buttons/HomeButton"
import MenuButton from "./buttons/MenuButton"
import ProfileButton from "./buttons/ProfileButton"
import SearchBar from "./SearchBar"

const HeaderBar: React.FC = () => {
    const { token } = useContext(UserContext)

    return (
        <AppBar elevation={0} variant="outlined" position="relative" sx={{backgroundColor: "transparent"}}>
            <Toolbar>
                <div style={{marginRight: "auto"}}>
                    <HomeButton />
                </div>

                <SearchBar />

                <div style={{marginLeft: "auto"}}>
                    {token ? (<ProfileButton />) : (<MenuButton />)}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar
