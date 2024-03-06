import { createTheme } from "@mui/material/styles"
import { purple, red } from "@mui/material/colors"
import { defaultTheme } from "@mui/material-next"

const theme = createTheme({
    palette: {
        primary: {main: purple[400]},
        secondary: {main: purple[200]},
        error: {main: red.A400}
    }
}, defaultTheme)

export default theme
