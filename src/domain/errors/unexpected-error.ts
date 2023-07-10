export class UnexpectedError extends Error {
  constructor() {
    super("Algo de errado aconteceu. Tenete novamente em breve.")
    this.name = "UnexpectedError"
  }
}
