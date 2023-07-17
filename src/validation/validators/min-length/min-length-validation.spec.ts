import { InvalidFielError } from "@/validation/errors"
import { MinLengthValidation } from "./min-length-validation"

type SutTypes = {
  sut: MinLengthValidation
}

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength)

describe("MinLengthValidation", () => {
  test("Should return error if value is invalid", () => {
    const field = "email"
    const sut = makeSut(field, 10)
    const error = sut.validate("123")
    expect(error).toEqual(new InvalidFielError(field))
  })

  test("Should return falsy if value is valid", () => {
    const field = "email"
    const sut = makeSut(field, 10)
    const error = sut.validate("victor.htp@hotmail.com")
    expect(error).toBeFalsy()
  })
})
