import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FormattedDate from "./formattedDate";
import "./Weather.css";

const apiKey = "b2a5adcct04b33178913oc335f405433";

export default function Weather({ defaultCity }) {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback((cityName) => {
    setLoading(true);
    setError("");

    axios
      .get("https://api.shecodes.io/weather/v1/current", {
        params: { query: cityName, key: apiKey, units: "metric" },
      })
      .then(({ data }) => {
        setWeather({
          city: data.city,
          temperature: data.temperature.current,
          humidity: data.temperature.humidity,
          description: data.condition.description,
          iconUrl: data.condition.icon_url,
          wind: data.wind.speed,
          date: new Date(data.time * 1000),
        });
      })
      .catch(() => {
        setError("Weather data could not be loaded. Check the city and try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchWeather(defaultCity);
  }, [defaultCity, fetchWeather]);

  function handleSubmit(event) {
    event.preventDefault();
    const searchCity = city.trim();
    if (searchCity) {
      fetchWeather(searchCity);
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
      {weather && (
        <>
          <h2>{weather.city}</h2>
          <ul>
            <li>
              <FormattedDate date={weather.date} />
            </li>
            <li>{weather.description}</li>
          </ul>
          <div className="row mt-3">
            <div className="col-6 clearfix">
              <img
                src={weather.iconUrl}
                alt={weather.description}
                className="float-left"
              />
              <div className="float-left">
                <span className="temperature">
                  {Math.round(weather.temperature)}
                </span>
                <span className="unit">°C</span>
              </div>
            </div>
            <div className="col-6">
              <ul>
                <li>Humidity: {weather.humidity}%</li>
                <li>Wind: {weather.wind} km/h</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
