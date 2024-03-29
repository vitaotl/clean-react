import { HttpStatusCode, HttpPostClient } from "@/data/protocols/http"
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors/"
import { Authentication, AuthenticationParams } from "@/domain/usecases"
import { AccountModel } from "@/domain/models/account-model"

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}

/*

data é onde ficarao as implementacoes dos casos de uso utilizando algum tipo
de implementacao

a classe RemoteAuthentication implementar a minha interface Authentication

*/
