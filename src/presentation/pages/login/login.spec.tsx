import React from "react"
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from "@testing-library/react"
import Login from "."
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test/"

import { faker } from "@faker-js/faker"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutTParams = {
  validationError: string
}

const makeSut = (params?: SutTParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()

  validationSpy.errorMessage = params?.validationError

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )
  return { sut, validationSpy, authenticationSpy }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  const emailInput = sut.getByTestId("email")
  fireEvent.input(emailInput, {
    target: { value: email }
  })

  const passwordInput = sut.getByTestId("password")
  fireEvent.input(passwordInput, {
    target: { value: password }
  })

  const submitButton = sut.getByTestId("submit") as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email")
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password")
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)

  expect(emailStatus.title).toBe(validationError || "Tudo certo!")
  expect(emailStatus.textContent).toBe(validationError ? "X" : "V")
}

describe("Login Component", () => {
  afterEach(cleanup)

  test("Should start with initial state", () => {
    const validationError = faker.word.words(5)
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId("errorWrap")
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, "email", validationError)
    simulateStatusForField(sut, "password", validationError)
  })

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    populateEmailField(sut, email)
    expect(validationSpy.fieldName).toBe("email")
    expect(validationSpy.fieldValue).toBe(email)
  })

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()

    populatePasswordField(sut, password)
    expect(validationSpy.fieldName).toBe("password")
    expect(validationSpy.fieldValue).toBe(password)
  })

  test("Should show email error if validation fails", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.word.words(5)

    populateEmailField(sut)
    simulateStatusForField(sut, "email", validationSpy.errorMessage)
  })

  test("Should show password error if validation fails", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.word.words(5)

    populatePasswordField(sut)

    simulateStatusForField(sut, "password", validationSpy.errorMessage)
  })

  test("Should show valid email if validation succeeds", () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    simulateStatusForField(sut, "email")
  })

  test("Should show valid password if validation succeeds", () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    const passwordStatus = sut.getByTestId("password-status")

    expect(passwordStatus.title).toBe("Tudo certo!")
    expect(passwordStatus.textContent).toBe("V")
  })

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test("Should show spinner on submit", () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId("spinner")
    expect(spinner).toBeTruthy()
  })

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
