/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react"
import { Footer, FormStatus, Input, LoginHeader } from "../../components"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./login-styles.scss"
import { Validation } from "@/presentation/protocols/validation"
import { Authentication } from "@/domain/usecases"

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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
    const validated = validation.validate("email", state.email)

    setState((prev) => ({
      ...prev,
      emailError: validated,
      disabled: !!validated
    }))
  }, [state.email])

  useEffect(() => {
    const validated = validation.validate("password", state.password)

    setState((prev) => ({
      ...prev,
      passwordError: validated,
      disabled: !!validated
    }))
  }, [state.password])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (state.isLoading || state.emailError || state.passwordError) return
    setState((prev) => ({
      ...prev,
      isLoading: true
    }))

    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }
  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testId="form"
          action=""
          className={styles.form}
          onSubmit={handleSubmit}
        >
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
