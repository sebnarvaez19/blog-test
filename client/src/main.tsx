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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {path: "/posts/:postId", element: <PostPage />, loader: postLoader},
      {path: "/users/:userId", element: <UserPage />, loader: userLoader},
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
