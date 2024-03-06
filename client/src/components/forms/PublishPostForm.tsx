import React from "react"
import { PublishPostFormPops } from "../../types"
import { Box, Button, Grid } from "@mui/material"
import TitleField from "../form_fields/TitleField"
import TagsField from "../form_fields/TagsField"
import BodyField from "../form_fields/BodyField"

const PublishPostForm: React.FC<PublishPostFormPops> = ({ title, setTitle, tags, setTags, body, setBody, submitHandler }) => {
    return (
        <Box margin="5vw">
            <form method="POST" onSubmit={submitHandler}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <TitleField title={title} setTitle={setTitle} />
                    </Grid>
                    <Grid item xs={12}>
                        <TagsField tags={tags} setTags={setTags} />
                    </Grid>
                    <Grid item xs={12}>
                        <BodyField body={body} setBody={setBody} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                            Publish
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default PublishPostForm
