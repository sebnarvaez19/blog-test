import React from "react"
import { TextField } from "@mui/material"
import { TagsFIeldProps } from "../../types"

const TagsField: React.FC<TagsFIeldProps> = ({ tags, setTags, width }) => {
    return (
        <TextField
            size="small"
            type="text"
            label="Tags"
            placeholder="Tags separated by ',' e.g.: tag1,tag2"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            sx={{width: width}}
        />
    )
}

export default TagsField
