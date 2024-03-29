import React, { useContext } from "react"
import Spinner from "../spinner/spinner"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./form-status-styles.scss"

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="errorWrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={styles.error}>
          {mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
