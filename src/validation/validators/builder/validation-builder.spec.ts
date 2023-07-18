import { faker } from "@faker-js/faker"
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from "../index"
import { ValidationBuilder as sut } from "./validation-builder"

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = faker.word.words(1)
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test("Should return EmailValidation", () => {
    const field = faker.word.words(1)

    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test("Should return minLengthValidation", () => {
    const field = faker.word.words(1)
    const length = faker.number.int(5)
    const validations = sut.field(field).minLength(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test("Should return a list of validations", () => {
    const field = faker.word.words(1)
    const validations = sut.field(field).required().email().minLength(5).build()

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5)
    ])
  })
})
