import { FieldValidationSpy } from "../../test"
import { ValidationComposite } from "./validation-composite"
import { faker } from "@faker-js/faker"
import { ValidationBuilder as Builder } from "../builder/validation-builder"

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const errorMessage = faker.word.words(5)
    const fieldName = faker.word.words(1)
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(errorMessage)

    const error = sut.validate(fieldName, faker.word.words(1))
    expect(error).toBe(errorMessage)
  })

  test("Should not return error if any validation succeeds", () => {
    const fieldName = faker.word.words(1)
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.word.words(1))
    expect(error).toBeFalsy()
  })
})
