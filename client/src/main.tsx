import React from "react"
import ReactDOM from "react-dom/client"

import CssBaseline from "@mui/material/CssBaseline"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { UserProvider } from "./contexts/UserContext.tsx"

import Root from "./routes/Root.tsx"
import Index from "./routes/Index.tsx"
import LoginPage from "./routes/LoginPage.tsx"
import RegisterPage from "./routes/RegisterPage.tsx"
import UserPage from "./routes/UserPage.tsx"
import PostPage from "./routes/PostPage.tsx"
import PublishPostPage from "./routes/PublishPostPage.tsx"

import { postLoader, userLoader } from "./loaders.ts"

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
        {/* <ThemeProvider theme={theme}> */}
            <UserProvider>
                <CssBaseline>
                    <RouterProvider router={router} />
                </CssBaseline>
            </UserProvider>
        {/* </ThemeProvider> */}
    </React.StrictMode>,
)
