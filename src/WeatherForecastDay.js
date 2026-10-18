import React from "react";
import { getWeatherDescription, getWeatherSymbol } from "./weatherCode";

export default function WeatherForecastDay(props) {
  return (
    <div>
      <div className="WeatherForecast-day">
        {new Date(`${props.data.date}T12:00:00`).toLocaleDateString(undefined, {
          weekday: "short",
        })}
      </div>
      <span
        className="weather-symbol"
        role="img"
        aria-label={getWeatherDescription(props.data.weatherCode)}
      >
        {getWeatherSymbol(props.data.weatherCode)}
      </span>
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {Math.round(props.data.maxTemperature)}°
        </span>
        <span className="WeatherForecast-temperature-min">
          {Math.round(props.data.minTemperature)}°
        </span>
      </div>
    </div>
  );
}
