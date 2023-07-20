import { SetStorageSpy } from "@/data/test"
import { faker } from "@faker-js/faker"
import { LocalSaveAccessToken } from "./local-salve-access-token"

describe("LocalSaveAccessToken", () => {
  test("Should call SetStorage with correct value", () => {
    const accessToken = faker.word.words(1)
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)

    sut.save(accessToken)
    expect(setStorageSpy.key).toBe("accessToken")
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
