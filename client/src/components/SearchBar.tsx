import React, { useCallback, useContext, useState } from "react"
import SearchField from "./form_fields/SearchField"
import { getPosts, searchPosts } from "../logic"
import PostContext from "../contexts/PostContext"


const SearchBar: React.FC = () => {
    const { setPosts } = useContext(PostContext)
    const [query, setQuery] = useState<string>("")

    const submitHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const filteredPosts = query ? await searchPosts(query) : await getPosts()
        setPosts(filteredPosts)
    }, [query, setPosts])

    return (
        <form onSubmit={submitHandler}>
            <SearchField query={query} setQuery={setQuery} />
        </form>
    )
}

export default SearchBar
