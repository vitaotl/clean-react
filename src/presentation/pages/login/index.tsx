import React, { useState } from "react"
import { Footer, FormStatus, Input, LoginHeader } from "../../components"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./login-styles.scss"

const Login: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false
  })

  const [errorState, setErrorState] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    main: ""
  })

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form action="" className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            type="submit"
            disabled
            className={styles.submit}
          >
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
