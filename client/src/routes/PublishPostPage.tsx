import React, { FormEvent, useContext, useState } from "react"
import PublishPostForm from "../components/forms/PublishPostForm"
import { publishPost } from "../logic"
import { UserContext } from "../contexts/UserContext"
import { Navigate, useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { Box } from "@mui/material"

const PublishPostPage: React.FC = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>("")
    const [tags, setTags] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { token } = useContext(UserContext)

    async function submitHandler(e: FormEvent) {
        e.preventDefault()
        const postId = await publishPost({ title, tags, body, token, setErrorMessage })
        navigate(`/posts/${postId}`)
    }

    return (
        <>
            {!token && <Navigate to="/" replace={true} state={token}/>}
            <PublishPostForm
                title={title}
                setTitle={setTitle}
                tags={tags}
                setTags={setTags}
                body={body}
                setBody={setBody}
                submitHandler={submitHandler}
            />
            <Box margin="2vw">
                <ErrorMessage message={errorMessage}/>
            </Box>
        </>
    )
}

export default PublishPostPage
