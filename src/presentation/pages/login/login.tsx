import React from "react"
import Footer from "./components/footer"
import LoginHeader from "./components/login-header"
import Spinner from "./components/spinner/spinner"

import styles from "./login-styles.scss"

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form action="" className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status}>X</span>
        </div>
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={styles.status}>X</span>
        </div>
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
