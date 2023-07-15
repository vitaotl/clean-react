import { Validation } from "../protocols/validation"

// Spy seria tipo "espionar" os inputs
// Stub seria mockar apenas uma saida

export class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
