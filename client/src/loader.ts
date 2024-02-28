import { LoaderFunction } from "react-router-dom"
import { getPost, getPosts } from "./logic"
import { ParamsProps } from "./types"

export const rootLoader: LoaderFunction = async () => {
    const posts = await getPosts()

    return posts
}

export const postLoader: LoaderFunction<ParamsProps> = async ({ params }) => {
    const post = await getPost(params.postId as string)

    return post
}