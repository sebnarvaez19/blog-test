import React from "react"
import { Button } from "@mui/material-next"
import { CommentSectionButtonProps } from "../../types"

const CommentButton: React.FC<CommentSectionButtonProps> = ({ allowComments }) => {
    return (
        <Button variant="filled" type="submit" disabled={!allowComments}>
            Comment  
        </Button>
    )
}

export default CommentButton
