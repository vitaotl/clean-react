import { SetStorageMock } from "@/data/test"
import { faker } from "@faker-js/faker"
import { LocalSaveAccessToken } from "./local-salve-access-token"

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return { sut, setStorageMock }
}

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", async () => {
    const accessToken = faker.word.words(1)
    const { sut, setStorageMock } = makeSut()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe("accessToken")
    expect(setStorageMock.value).toBe(accessToken)
  })

  test("Should throw if SetStorage throws", async () => {
    const accessToken = faker.word.words(1)
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error())
    const promise = sut.save(accessToken)
    await expect(promise).rejects.toThrow(new Error())
  })
})
