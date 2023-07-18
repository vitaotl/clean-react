import { Login, Logout } from "@/presentation/pages"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

type Props = {
  makeLogin: React.FC
}

const MyRouter: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <Router>
      <Routes>
        <Route path="/log-in" Component={makeLogin} />
        <Route path="/" element={<Logout size={3} />} />
      </Routes>
    </Router>
  )
}

export default MyRouter
