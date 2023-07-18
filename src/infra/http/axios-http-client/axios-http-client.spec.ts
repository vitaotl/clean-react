import { AxiosHttpClient } from "./axios-http-client"
import { mockAxios } from "@/infra/test"
import axios from "axios"
import { mockPostRequest } from "@/data/test"
import { faker } from "@faker-js/faker"

jest.mock("axios")

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe("AxiosHttpClient", () => {
  test("Should call Axios with correct url and verb", async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test("Should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut()
    const HttpResponsePromise = sut.post(mockPostRequest())
    expect(HttpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test("Should return correct statusCode and body on failure", () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: faker.number.float(), status: faker.number.int() }
    })
    const HttpResponsePromise = sut.post(mockPostRequest())
    expect(HttpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
