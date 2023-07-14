import React, { useContext } from "react"
import Spinner from "../spinner/spinner"
import Context from "@/presentation/contexts/form/form-context"

import styles from "./form-status-styles.scss"

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="errorWrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  )
}

export default FormStatus
