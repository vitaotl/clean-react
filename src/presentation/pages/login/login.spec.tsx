import React from "react"
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor
} from "@testing-library/react"
import Login from "."
import {
  AuthenticationSpy,
  ValidationSpy,
  SaveAccessTokenMock
} from "@/presentation/test/"
import { InvalidCredentialsError } from "@/domain/errors"

import { faker } from "@faker-js/faker"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutTParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ["/log-in"] })

const makeSut = (params?: SutTParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationSpy.errorMessage = params?.validationError

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return { sut, validationSpy, authenticationSpy, saveAccessTokenMock }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const emailInput = sut.getByTestId("email")
  fireEvent.input(emailInput, {
    target: { value: email }
  })

  const passwordInput = sut.getByTestId("password")
  fireEvent.input(passwordInput, {
    target: { value: password }
  })

  const form = sut.getByTestId("form")
  fireEvent.submit(form)
  await waitFor(() => form)
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

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)

  expect(emailStatus.title).toBe(validationError || "Tudo certo!")
  expect(emailStatus.textContent).toBe(validationError ? "X" : "V")
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId("errorWrap")
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fielName: string): void => {
  const element = sut.getByTestId(fielName)
  expect(element).toBeTruthy()
}

const testElementText = (
  sut: RenderResult,
  fielName: string,
  text: string
): void => {
  const element = sut.getByTestId(fielName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe("Login Component", () => {
  afterEach(cleanup)

  test("Should start with initial state", () => {
    const validationError = faker.word.words(5)
    const { sut } = makeSut({ validationError })
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, "submit", true)
    testStatusForField(sut, "email", validationError)
    testStatusForField(sut, "password", validationError)
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
    testStatusForField(sut, "email", validationSpy.errorMessage)
  })

  test("Should show password error if validation fails", () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.word.words(5)

    populatePasswordField(sut)

    testStatusForField(sut, "password", validationSpy.errorMessage)
  })

  test("Should show valid email if validation succeeds", () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    testStatusForField(sut, "email")
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

    testButtonIsDisabled(sut, "submit", false)
  })

  test("Should show spinner on submit", async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    testElementExists(sut, "spinner")
  })

  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test("Should call Authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test("Should call not Authentication if form is invalid", async () => {
    const validationError = faker.word.words(5)
    const { sut, authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, `auth`)
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testElementText(sut, "main-error", error.message)
    testErrorWrapChildCount(sut, 1)
  })

  test("Should call SaveAccessToken on success", async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe("/")
  })

  test("Should go to signup page", async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const register = sut.getByTestId("signup")
    fireEvent.click(register)

    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe("/signup")
  })
})
