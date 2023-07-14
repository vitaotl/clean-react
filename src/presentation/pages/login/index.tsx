import React, { useState } from "react"
import { Footer, FormStatus, Input, LoginHeader } from "../../components"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./login-styles.scss"

type StateProps = {
  isLoading: false
  errorMessage: string
}

const Login: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: ""
  })
  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form action="" className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
