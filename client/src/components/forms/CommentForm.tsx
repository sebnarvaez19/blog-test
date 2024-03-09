import React, { FormEvent, useContext, useState } from "react"
import { CommentSectionFormProps } from "../../types"
import { Grid } from "@mui/material"
import CommentField from "../form_fields/CommentField"
import CommentButton from "../buttons/CommentButton"
import { publishComment } from "../../logic"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const CommentForm: React.FC<CommentSectionFormProps> = ({ allowComments, postId }) => {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const [comment, setComment] = useState<string>("")


    async function submitHandler(e: FormEvent) {
        e.preventDefault()
        console.log(comment)
        const comentedPost = await publishComment(postId, token as string, comment)
        if (comentedPost) {
            navigate(0)
        }
    }
    
    
    return (
        <form method="POST" onSubmit={submitHandler}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{marginBottom: "-10px"}}>
                <Grid item>
                    <CommentField allowComments={allowComments} comment={comment} setComment={setComment}/>
                </Grid>
                <Grid item>
                    <CommentButton allowComments={allowComments} />
                </Grid>
            </Grid>
        </form>
    )
}

export default CommentForm
