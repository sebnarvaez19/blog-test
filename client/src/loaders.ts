import { getPost, getUser } from "./logic";

export async function postLoader({ params }) {
    const post = await getPost(params.postId)

    return post
}

export async function userLoader({ params }) {
    const user = await getUser(params.userId)

    return user
}