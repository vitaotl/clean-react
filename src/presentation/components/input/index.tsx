/* eslint-disable react/prop-types */
import React, { useContext } from "react"
import styles from "./input-styles.scss"
import Context from "@/presentation/contexts/form/form-context"

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return "X"
  }

  const getTitle = (): string => {
    return error
  }
  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={(e) => enableInput(e)} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
