import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/Root.tsx"
import { UserProvider } from "./contexts/UserContext.tsx"
import LoginPage from "./routes/LoginPage.tsx"
import RegisterPage from "./routes/RegisterPage.tsx"
import Index from "./routes/Index.tsx"
import PostPage from "./routes/PostPage.tsx"
import { postLoader, userLoader } from "./loaders.ts"
import PublishPostPage from "./routes/PublishPostPage.tsx"
import UserPage from "./routes/UserPage.tsx"
import theme from "./theme.tsx"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

const router = createBrowserRouter([
    {
        "path": "/",
        "element": <Root />,
        "children": [
            {"index": true, "element": <Index />},
            {"path": "/login", "element": <LoginPage />},
            {"path": "/register", "element": <RegisterPage />},
            {"path": "/posts/:postId", "element": <PostPage />, "loader": postLoader},
            {"path": "/users/:userId", "element": <UserPage />, "loader": userLoader},
            {"path": "/posts/create", "element": <PublishPostPage />},
        ]
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <UserProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </UserProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
