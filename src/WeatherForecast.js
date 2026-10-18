import React from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast({ forecast }) {
  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 5).map((dailyForecast) => (
          <div className="col" key={dailyForecast.date}>
            <WeatherForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
}
