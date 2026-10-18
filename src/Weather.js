import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

const CURRENT_WEATHER_URL = "https://api.shecodes.io/weather/v1/current";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const SHECODES_API_KEY = process.env.REACT_APP_SHECODES_API_KEY;

export default function Weather({ defaultCity = "New York" }) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(defaultCity);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const requestController = useRef(null);

  const loadWeather = useCallback(async (cityName) => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setLoading(true);
    setError("");

    try {
      if (!SHECODES_API_KEY) {
        setError("Missing SheCodes API key. Set REACT_APP_SHECODES_API_KEY and restart the app.");
        return;
      }

      const { data: current } = await axios.get(CURRENT_WEATHER_URL, {
        params: { query: cityName, key: SHECODES_API_KEY },
        signal: controller.signal,
      });

      const { data: forecast } = await axios.get(FORECAST_URL, {
        params: {
          latitude: current.coordinates.latitude,
          longitude: current.coordinates.longitude,
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
          forecast_days: 6,
        },
        signal: controller.signal,
      });

      setWeatherData({
        city: current.city,
        country: current.country,
        temperature: current.temperature.current,
        humidity: current.temperature.humidity,
        date: new Date(current.time * 1000),
        description: current.condition.description,
        iconUrl: current.condition.icon_url.replace(/^http:/, "https:"),
        wind: current.wind.speed * 3.6,
        forecast: forecast.daily.time.map((date, index) => ({
          date,
          weatherCode: forecast.daily.weather_code[index],
          maxTemperature: forecast.daily.temperature_2m_max[index],
          minTemperature: forecast.daily.temperature_2m_min[index],
        })),
      });
    } catch (requestError) {
      if (!axios.isCancel(requestError)) {
        if (requestError.response?.status === 404) {
          setError(`We couldn't find "${cityName}". Check the spelling and try again.`);
        } else {
          setError("Weather data could not be loaded. Please try again.");
        }
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadWeather(defaultCity);
    return () => requestController.current?.abort();
  }, [defaultCity, loadWeather]);

  function handleSubmit(event) {
    event.preventDefault();
    const searchCity = city.trim();
    if (searchCity) {
      loadWeather(searchCity);
    }
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <label className="visually-hidden" htmlFor="city-search">
              City
            </label>
            <input
              id="city-search"
              type="search"
              placeholder="Enter a city..."
              className="form-control"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-primary w-100">
              Search
            </button>
          </div>
        </div>
      </form>
      {loading && <p role="status">Loading weather...</p>}
      {error && <p role="alert">{error}</p>}
      {weatherData && (
        <>
          <WeatherInfo data={weatherData} />
          <WeatherForecast forecast={weatherData.forecast} />
        </>
      )}
    </div>
  );
}
