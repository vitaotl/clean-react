import { InvalidFielError } from "@/validation/errors"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(value: string): Error {
    const validate = value.length >= this.minLength
    return validate ? null : new InvalidFielError(this.field)
  }
}
