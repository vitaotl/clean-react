export class InvalidFielError extends Error {
  constructor(fieldLabel: string) {
    super(`O campo ${fieldLabel} está incorreto`)
  }
}
