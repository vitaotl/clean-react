import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-fiel-validation"

describe("RequiredFieldValidation", () => {
  test("Shoul return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email")
    const error = sut.validate("victor")
    expect(error).toEqual(new RequiredFieldError())
  })
})
