import { environment } from "src/environments/environment";

export const ApiConfig = {
  events: {
    get: (query: string) => `${environment.apiBaseUrl}?query=${query}`,
    news: () => `https://script.google.com/macros/s/AKfycbx4P8kjQyn9QHoBxNTEmwb6sE8KSlFaaFIUilQ5pZJH2Is07nFqN-jWyf1xZxN2ljqZ/exec`,
    contact: () => ``,
  }
}
