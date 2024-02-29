import React from "react"
import ReactDOM from "react-dom/client"
import "beercss"
import "material-dynamic-colors"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/Root"
import Index from "./routes/Index"
import { postLoader, userLoader } from "./loader"
import { PostPage } from "./routes/PostPage"
import { UserPage } from "./routes/UserPage"
import LoginPage from "./routes/LoginPage"
import SignUpPage from "./routes/SignUpPage"
import Authprovider from "./auth/AuthProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {path: "/posts/:postId", element: <PostPage />, loader: postLoader},
      {path: "/users/:userId", element: <UserPage />, loader: userLoader},
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </React.StrictMode>,
)
