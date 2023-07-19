import React from "react"
import { render, RenderResult } from "@testing-library/react"
import Input from "."
import Context from "@/presentation/contexts/form/form-context"
import { faker } from "@faker-js/faker"

type SutTypes = {
  sut: RenderResult
  name: string
}

const makeSut = (): SutTypes => {
  const name = faker.word.words(1)
  const sut = render(
    <Context.Provider value={{ state: {} }}>
      <Input name={name} />
    </Context.Provider>
  )
  return { sut, name }
}

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const { sut, name } = makeSut()
    const input = sut.getByTestId(name) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test("Should disable readOnly on focus", () => {
    const { sut, name } = makeSut()
    const input = sut.getByTestId(name) as HTMLInputElement
    input.focus()
    expect(input.readOnly).toBe(false)
  })
})
