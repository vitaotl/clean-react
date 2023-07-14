import React, { useContext } from "react"
import Spinner from "../spinner/spinner"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./form-status-styles.scss"

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="errorWrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
