import React from "react"
import { Button } from "@mui/material-next"

const NewPostButton: React.FC = () => {    
    return (
        <Button variant="filled" href="/posts/create">
            New Post
        </Button>
    )
}

export default NewPostButton
