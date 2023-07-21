import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-salve-access-token"
import { SaveAccessToken } from "@/domain/usecases"
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory"

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
