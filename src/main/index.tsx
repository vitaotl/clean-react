import MyRouter from "@/presentation/components/router"
import React from "react"
import ReactDOM from "react-dom"
import "@/presentation/styles/global.scss"
import { MakeLogin } from "./factories/pages/login/login-factory"

ReactDOM.render(<MyRouter makeLogin={MakeLogin}/>, document.getElementById("main"))
