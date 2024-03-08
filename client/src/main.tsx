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
import { useFechtPosts } from "./hooks/FetchData.ts"
import PostContext from "./contexts/PostContext.tsx"

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


const Main: React.FC = () => {
    const { posts, setPosts } = useFechtPosts()

    return (
        <React.StrictMode>
            <PostContext.Provider value={{ posts, setPosts }}>
                <UserProvider>
                    <CssBaseline>
                        <RouterProvider router={router} />
                    </CssBaseline>
                </UserProvider>
            </PostContext.Provider>
        </React.StrictMode>
    )
}


ReactDOM.createRoot(document.getElementById("root")!).render(<Main />)
