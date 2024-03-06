import React, { Dispatch, SetStateAction } from "react"
import { TextField } from "@mui/material"

interface UsernameFieldProps {
    username: string | null,
    usernameHandler: Dispatch<SetStateAction<string>>,
}

const UsernameField: React.FC<UsernameFieldProps> = ({ username, usernameHandler }) => {
    return (
        <TextField
            type="text"
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => usernameHandler(e.target.value)}
            required
        />
    )
}

export default UsernameField
