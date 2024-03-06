import React from "react"
import { TextField } from "@mui/material"
import { TagsFIeldProps } from "../../types"

const TagsField: React.FC<TagsFIeldProps> = ({ tags, setTags }) => {
    return (
        <TextField
            type="text"
            label="Tags"
            placeholder="Tags separated by ',' e.g.: tag1,tag2"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            sx={{width: "60vw"}}
        />
    )
}

export default TagsField
