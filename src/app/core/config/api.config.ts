import { environment } from "src/environments/environment";

export const ApiConfig = {
  events: {
    get: (query: string) => `${environment.apiBaseUrl}?query=${query}`,
    news: () => `https://script.google.com/macros/s/AKfycbyDUymkzMGpWy1eY-tB9jYLu_PLG18IrQmHFa80-PLZJMB_2YSUeictgadRRgO6bgs9/exec`,
    contact: () => ``,
  },
  rsvp: {
    post: () => `https://api.apispreadsheets.com/data/m4fodwbSX1bxutUD/`,
  }
}
