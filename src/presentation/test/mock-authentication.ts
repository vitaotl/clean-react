import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Authentication, AuthenticationParams } from "@/domain/usecases"

// Spy seria tipo "espionar" os inputs
// Stub seria mockar apenas uma saida

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  callsCount = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(mockAccountModel())
  }
}
