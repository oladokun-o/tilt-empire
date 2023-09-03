import { environment } from "src/environments/environment";

export const ApiConfig = {
  events: {
    get: (query: string) => `${environment.apiBaseUrl}?query=${query}`,
    news: () => `https://api.apispreadsheets.com/data/iznXuf6JfcjxUsAE/`,
    contact: () => ``,
  },
  rsvp: {
    post: () => `https://api.apispreadsheets.com/data/m4fodwbSX1bxutUD/`,
  }
}
