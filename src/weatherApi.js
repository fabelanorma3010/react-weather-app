import axios from "axios";

export function getWeather(type, query) {
  const params = { query, units: "metric" };

  if (process.env.NODE_ENV === "development") {
    const apiKey = process.env.REACT_APP_SHECODES_API_KEY;
    if (!apiKey) {
      return Promise.reject(
        new Error("REACT_APP_SHECODES_API_KEY is not configured for local development.")
      );
    }

    return axios.get(`https://api.shecodes.io/weather/v1/${type}`, {
      params: { ...params, key: apiKey },
    });
  }

  return axios.get("/api/weather", {
    params: { ...params, type },
  });
}
