import React from "react"
import ReactDOM from "react-dom/client"
import "beercss"
import "material-dynamic-colors"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/Root"
import Index from "./routes/Index"
import { postLoader, rootLoader } from "./loader"
import { Post } from "./routes/Post"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {index: true, element: <Index />, loader: rootLoader},
      {path: "/posts/:postId", element: <Post />, loader: postLoader}
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
