import { getPosts } from "./logic"
import { Post } from "./types"

export async function rootLoader(): Promise<Post[]> {
    const posts = await getPosts()

    return posts
}
