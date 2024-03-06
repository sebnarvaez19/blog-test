import { AccountCircle } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import React, { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { decodeJWT } from "../../logic"
import { useNavigate } from "react-router-dom"

const ProfileButton: React.FC = () => {
    const navigate = useNavigate()
    const { token, setToken } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const tokenDecoded = decodeJWT(token as string)

    function clickHandler(e: React.MouseEvent<HTMLElement>) {
        setAnchorEl(e.currentTarget)
    }

    function closeHandler() {
        setAnchorEl(null)
    }
    
    function goToProfile() {
        navigate(`/users/${tokenDecoded.id}`)
    }

    function logOut() {
        setToken(null)
    }

    return (
        <>
            <IconButton aria-label="account-options" size="large" onClick={clickHandler}>
                <AccountCircle fontSize="inherit" />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeHandler}
                anchorOrigin={{"vertical": "top", "horizontal": "right"}}
                transformOrigin={{"vertical": "top", "horizontal": "right"}}
            >
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>   
            </Menu>
        </>
    )
}

export default ProfileButton
