import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"
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

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(mockAccountModel())
  }
}
