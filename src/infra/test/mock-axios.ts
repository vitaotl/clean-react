import axios from "axios"
import { faker } from "@faker-js/faker"

export const mockHttpResponse = (): object => ({
  data: faker.number.float(),
  status: faker.number.int()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
