import { InvalidFielError } from "@/validation/errors"
import { EmailValidation } from "./email-validation"

describe("EmailValidation", () => {
  test("Shoul return error if email is invalid", () => {
    const sut = new EmailValidation("email")
    const error = sut.validate("")
    expect(error).toEqual(new InvalidFielError("email"))
  })
})
