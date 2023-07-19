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
      </Routes>
    </Router>
  )
}

export default MyRouter
