import React from "react"
import { Button } from "@mui/material"

const NewPostButton: React.FC = () => {    
    return (
        <Button variant="contained" href="/posts/create">
            New Post
        </Button>
    )
}

export default NewPostButton
