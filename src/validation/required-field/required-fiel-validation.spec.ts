import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-fiel-validation"
import { faker } from "@faker-js/faker"

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())

describe("RequiredFieldValidation", () => {
  test("Shoul return error if field is empty", () => {
    const sut = makeSut()
    const error = sut.validate("")
    expect(error).toEqual(new RequiredFieldError())
  })

  test("Shoul return falsy if field is not empty", () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.words(5))
    expect(error).toBeFalsy()
  })
})
