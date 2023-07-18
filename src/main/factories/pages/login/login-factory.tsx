import React from "react"
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory"
import { makeLoginValidation } from "./login-validation-factory"
import { Login } from "@/presentation/pages"

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
