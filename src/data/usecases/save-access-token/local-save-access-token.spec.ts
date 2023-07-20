import { SetStorageSpy } from "@/data/test"
import { faker } from "@faker-js/faker"
import { LocalSaveAccessToken } from "./local-salve-access-token"

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return { sut, setStorageSpy }
}

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", () => {
    const accessToken = faker.word.words(1)
    const { sut, setStorageSpy } = makeSut()
    sut.save(accessToken)
    expect(setStorageSpy.key).toBe("accessToken")
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
