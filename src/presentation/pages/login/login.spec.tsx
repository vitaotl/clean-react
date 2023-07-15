import React from "react"
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from "@testing-library/react"
import Login from "."
import { ValidationSpy } from "@/presentation/test/"

import { faker } from "@faker-js/faker"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()

  validationSpy.errorMessage = faker.word.words(5)
  const sut = render(<Login validation={validationSpy} />)
  return { sut, validationSpy }
}

describe("Login Component", () => {
  afterEach(cleanup)

  test("Should start with initial state", () => {
    const { sut, validationSpy } = makeSut()
    const errorWrap = sut.getByTestId("errorWrap")
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId("email-status")
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe("X")

    const passwordStatus = sut.getByTestId("password-status")
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe("X")
  })

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId("email")
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe("email")
    expect(validationSpy.fieldValue).toBe(email)
  })

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId("password")
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe("password")
    expect(validationSpy.fieldValue).toBe(password)
  })

  test("Should show email error if validation fails", () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId("email-status")

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe("X")
  })

  test("Should show password error if validation fails", () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId("password-status")

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe("X")
  })

  test("Should show valid email if validation succeeds", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const emailStatus = sut.getByTestId("email-status")

    expect(emailStatus.title).toBe("Tudo certo!")
    expect(emailStatus.textContent).toBe("V")
  })

  test("Should show valid password if validation succeeds", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId("password-status")

    expect(passwordStatus.title).toBe("Tudo certo!")
    expect(passwordStatus.textContent).toBe("V")
  })

  test("Should enable submit button if form is valid", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
