import "jest-localstorage-mock"
import { LocalStorageAdapter } from "./local-storage-adapter"
import { faker } from "@faker-js/faker"

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test("Should call localStorage with correct values", async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.word.words(1)
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
