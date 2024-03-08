import React, { FormEventHandler, useCallback, useContext, useEffect, useState } from "react"
import SearchField from "./form_fields/SearchField"
import { getPosts, searchPosts } from "../logic"
import PostContext from "../contexts/PostContext"

const SearchBar: React.FC = () => {
    const { setPosts } = useContext(PostContext)
    const [query, setQuery] = useState<string>("")

    const submitHandler = useCallback(async () => {
        let filteredPosts
        if (query) {
            filteredPosts = await searchPosts(query)
        } else {
            filteredPosts = await getPosts()
        }

        setPosts(filteredPosts)
    }, [query, setPosts])

    useEffect(() => {
        function keyDownHandler(e: FormEventHandler<HTMLFormElement>) {
            if (e.key === "Enter") {
                e.preventDefault()
                submitHandler()
            }
        }

        document.addEventListener("keydown", keyDownHandler)

        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    }, [submitHandler])

    
    return (
        <form onSubmit={submitHandler}>
            <SearchField query={query} setQuery={setQuery} />
        </form>
    )
}

export default SearchBar
