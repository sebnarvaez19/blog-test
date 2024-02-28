import React from "react"
import ReactDOM from "react-dom/client"
import "beercss"
import "material-dynamic-colors"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/Root"
import Index from "./routes/Index"
import { postLoader, userLoader } from "./loader"
import { Post } from "./routes/Post"
import { User } from "./routes/User"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {path: "/posts/:postId", element: <Post />, loader: postLoader},
      {path: "/users/:userId", element: <User />, loader: userLoader},
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
