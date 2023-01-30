import { environment } from "src/environments/environment";

const apiVersion = 'v2';

export const ApiConfig = {
  events: {
    get: (query: string) => `${environment.apiBaseUrl}?query=${query}`
  }
}
