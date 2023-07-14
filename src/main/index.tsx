import { Router } from "@/presentation/components"
import { Login } from "@/presentation/pages"
import React from "react"
import ReactDOM from "react-dom"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import '@/presentation/styles/global.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Router />
  },
  {
    path: "/log-in",
    element: <Login />
  }
])

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("main"))
