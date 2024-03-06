import { Menu as MenuIcon } from "@mui/icons-material"
import { IconButton, Link, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"

const MenuButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    function clickHandler(e: React.MouseEvent<HTMLElement>) {
        setAnchorEl(e.currentTarget)
    }

    function closeHandler() {
        setAnchorEl(null)
    }
    
    return (
        <>
            <IconButton aria-label="menu" size="large" onClick={clickHandler}>
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <Menu
                 open={open}
                 anchorEl={anchorEl}
                 onClose={closeHandler}
                 anchorOrigin={{"vertical": "top", "horizontal": "right"}}
                 transformOrigin={{"vertical": "top", "horizontal": "right"}}
            >
                <MenuItem><Link href="/login" underline="none">Login</Link></MenuItem>
                <MenuItem><Link href="/register" underline="none">Register</Link></MenuItem>
            </Menu>
        </>
    )
}

export default MenuButton