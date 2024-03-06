import React, { FormEventHandler, useEffect, useState } from "react"
import SearchField from "./form_fields/SearchField"

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>("")

    function submitHandler() {
        console.log(`You pressed Enter key ✔️. Your query is: ${query}`)
    }

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
