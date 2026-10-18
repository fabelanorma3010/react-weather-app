import React, { useCallback, useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import { getWeather } from "./weatherApi";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [city, setCity] = useState(props.defaultCity);
  const [error, setError] = useState(null);

  const search = useCallback((searchCity) => {
    getWeather("current", searchCity)
      .then((response) => {
        const data = response.data;
        setWeatherData({
          ready: true,
          coordinates: {
            lon: data.coordinates.longitude,
            lat: data.coordinates.latitude,
          },
          temperature: data.temperature.current,
          humidity: data.temperature.humidity,
          date: new Date(data.time * 1000),
          description: data.condition.description,
          icon: data.condition.icon,
          wind: data.wind.speed,
          city: data.city,
        });
        setError(null);
      })
      .catch((apiError) => {
        console.error("Unable to load current weather.", apiError);
        setError("Weather data is unavailable.");
      });
  }, []);

  useEffect(() => {
    search(props.defaultCity);
  }, [props.defaultCity, search]);

  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo
          data={weatherData}
          temperatureUnit={temperatureUnit}
          onTemperatureUnitChange={setTemperatureUnit}
        />
        <WeatherForecast
          city={weatherData.city}
          temperatureUnit={temperatureUnit}
        />
      </div>
    );
  } else {
    return error || "Loading...";
  }
}
