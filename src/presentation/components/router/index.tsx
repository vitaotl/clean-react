import { Login, Logout } from "@/presentation/pages"
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// const router = createBrowserRouter([
//   {
//     path: "/log-in",
//     element: (
//       <Login
//         validation={new ValidationSpy()}
//         authentication={new AuthenticationSpy()}
//       />
//     )
//   }
// ])
const MyRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              validation={new ValidationSpy()}
              authentication={new AuthenticationSpy()}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout size={3}/>
          }
        />
      </Routes>
    </Router>
  )
}

export default MyRouter
