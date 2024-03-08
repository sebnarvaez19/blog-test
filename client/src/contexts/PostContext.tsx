import React, { createContext } from "react"
import { PostProps } from "../types"

interface PostContextProps {
    posts: PostProps[],
    setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
}

const PostContext = createContext<PostContextProps>({
    posts: [],
    setPosts: () => {}
})

export default PostContext
