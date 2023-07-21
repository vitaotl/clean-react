import React from "react"
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory"
import { makeLoginValidation } from "./login-validation-factory"
import { Login } from "@/presentation/pages"
import { makeLocalSaveAccessToken } from "../../usecases/save-access-token/local-save-access-token-factory"

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
