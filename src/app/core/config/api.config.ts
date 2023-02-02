import { environment } from "src/environments/environment";

export const ApiConfig = {
  events: {
    get: (query: string) => `${environment.apiBaseUrl}?query=${query}`
  }
}
