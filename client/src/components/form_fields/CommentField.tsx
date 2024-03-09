import React from "react"
import { TextField } from "@mui/material"
import { CommentSectionFieldProps } from "../../types"

const CommentField: React.FC<CommentSectionFieldProps> = ({ allowComments, comment, setComment }) => {
    return (
        <TextField
            multiline
            variant="outlined"
            placeholder="Something to say?"
            size="small"
            disabled={!allowComments}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
                sx: {borderRadius: 9, width: "40vh"}
            }}
        />
    )
}

export default CommentField
