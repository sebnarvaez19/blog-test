import { InputAdornment, TextField } from "@mui/material"
import React from "react"
import { SearchFieldProps } from "../../types"
import { Search } from "@mui/icons-material"


const SearchField: React.FC<SearchFieldProps> = ({ query, setQuery }) => {
    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
                sx: {borderRadius: 9, width: "40vw"}
            }}
        />
    )
}

export default SearchField
