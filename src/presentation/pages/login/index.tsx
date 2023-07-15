import React, { useState, useEffect } from "react"
import { Footer, FormStatus, Input, LoginHeader } from "../../components"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./login-styles.scss"
import { Validation } from "@/presentation/protocols/validation"

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
    disabled: true
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      emailError: validation.validate("email", state.email),
      disabled: !!validation.validate("email", state.email)
    }))
  }, [state.email])

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      passwordError: validation.validate("password", state.password),
      disabled: !!validation.validate("password", state.password)
    }))
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
            disabled={state.disabled}
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
