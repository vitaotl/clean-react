import { Login } from "@/presentation/pages"
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([
  {
    path: "/log-in",
    element: (
      <Login
        validation={new ValidationSpy()}
        authentication={new AuthenticationSpy()}
      />
    )
  }
])
const Router: React.FC = () => {
  return <RouterProvider router={router} />
}

export default Router
