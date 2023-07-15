import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"

// Spy seria tipo "espionar" os inputs
// Stub seria mockar apenas uma saida

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(mockAccountModel())
  }
}
