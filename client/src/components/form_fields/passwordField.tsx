import React, { Dispatch, SetStateAction } from "react"
import { TextField } from "@mui/material"

interface PasswordFieldProps {
    password: string | null,
    passwordHandler: Dispatch<SetStateAction<string>>,
}

const PasswordField: React.FC<PasswordFieldProps> = ({ password, passwordHandler }) => {
    return (
        <TextField
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => passwordHandler(e.target.value)}
            required
        />
    )
}

export default PasswordField
