import React from "react"
import { BodyFieldProps } from "../../types"
import { TextField } from "@mui/material"

const BodyField: React.FC<BodyFieldProps> = ({ body, setBody, width }) => {
    return (
        <TextField
            multiline
            rows={14}
            label="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            sx={{width: width}}
        />
    )
}

export default BodyField
