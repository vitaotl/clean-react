/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react"
import { Footer, FormStatus, Input, LoginHeader } from "../../components"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./login-styles.scss"
import { Validation } from "@/presentation/protocols/validation"
import { Authentication, SaveAccessToken } from "@/domain/usecases"
import { Link, useNavigate } from "react-router-dom"

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const navigate = useNavigate()
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
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState((prev) => ({
        ...prev,
        isLoading: true
      }))

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      navigate("/", { replace: true })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }))
    }
  }
  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
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
          <Link data-testid="signup" to="/signup" className={styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
