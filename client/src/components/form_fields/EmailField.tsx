import React, { Dispatch, SetStateAction } from "react"
import { TextField } from "@mui/material"

interface EmailFieldProps {
    email: string | null,
    emailHandler: Dispatch<SetStateAction<string>>,
}

const EmailField: React.FC<EmailFieldProps> = ({ email, emailHandler }) => {
    return (
        <TextField
            type="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => emailHandler(e.target.value)}
        />
    )
}

export default EmailField
