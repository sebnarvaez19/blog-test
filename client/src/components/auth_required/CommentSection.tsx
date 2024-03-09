import React, { useContext } from "react"
import CommentForm from "../forms/CommentForm"
import { UserContext } from "../../contexts/UserContext"
import { Card, CardContent } from "@mui/material"
import { CommentSectionProps } from "../../types"

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const { token } = useContext(UserContext)
    const allowComments = Boolean(token)

    return (
        <Card variant="outlined">
            <CardContent>
                <CommentForm allowComments={allowComments} postId={postId} />
            </CardContent>
        </Card>
    )
}

export default CommentSection
