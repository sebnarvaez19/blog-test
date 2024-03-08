import React from "react"
import { TitleFieldProps } from "../../types"
import { TextField } from "@mui/material"

const TitleField: React.FC<TitleFieldProps> = ({ title, setTitle, width }) => {
    return (
        <TextField
            type="text"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{width: width}}
        />
    )
}

export default TitleField
