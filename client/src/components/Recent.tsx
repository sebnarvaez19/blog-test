import React from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"

const Recent: React.FC = () => {
    return (
        <Card variant="outlined" sx={{width: `${2.8/12*100}vw`}}>
            <CardContent>
                <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">
                            Recent
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Recent
