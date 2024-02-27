import { getPosts } from "./logic"
import { RootLoaderData } from "./types"

export async function rootLoader(): Promise<RootLoaderData> {
    const posts = await getPosts()

    return { posts }
}
