import { InvalidFielError } from "@/validation/errors"
import { EmailValidation } from "./email-validation"
import { faker } from "@faker-js/faker"

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new EmailValidation(field)
  return { sut }
}

describe("EmailValidation", () => {
  test("Should return error if email is invalid", () => {
    const { sut } = makeSut("email")
    const error = sut.validate(faker.word.words(5))
    expect(error).toEqual(new InvalidFielError("email"))
  })

  test("Should falsy if email is valid", () => {
    const { sut } = makeSut("email")
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
