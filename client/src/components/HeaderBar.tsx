import React, { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { AppBar, Toolbar } from "@mui/material"
import HomeButton from "./buttons/HomeButton"
import MenuButton from "./buttons/MenuButton"
import ProfileButton from "./buttons/ProfileButton"

const HeaderBar: React.FC = () => {
    const { token } = useContext(UserContext)

    return (
        <>
            <AppBar variant="outlined" position="relative" elevation={0}>
                <Toolbar>
                    <div style={{marginRight: "auto"}}>
                        <HomeButton />
                    </div>

                    <div>
                        The search bar should be here
                    </div>

                    <div style={{marginLeft: "auto"}}>
                        {token ? (<ProfileButton />) : (<MenuButton />)}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default HeaderBar
