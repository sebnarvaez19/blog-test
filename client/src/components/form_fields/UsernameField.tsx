import React, { Dispatch, SetStateAction } from "react"
import { TextField } from "@mui/material"

interface UsernameFieldProps {
    username: string | null,
    usernameHandler: Dispatch<SetStateAction<string>>,
    size: string
}

const UsernameField: React.FC<UsernameFieldProps> = ({ username, usernameHandler, size }) => {
    return (
        <TextField
            type="text"
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => usernameHandler(e.target.value)}
            required
            size={size}
        />
    )
}

export default UsernameField
