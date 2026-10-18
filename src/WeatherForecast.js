import React, { useEffect, useState } from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";
import { getWeather } from "./weatherApi";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);

    getWeather("forecast", props.city)
      .then((response) => {
        if (!Array.isArray(response.data.daily)) {
          throw new Error("The weather forecast response has no daily data.");
        }

        if (!cancelled) {
          setForecast(
            response.data.daily.map((day) => ({
              dt: day.time,
              temp: {
                max: day.temperature.maximum,
                min: day.temperature.minimum,
              },
              weather: [{ icon: day.condition.icon }],
            }))
          );
          setLoaded(true);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Unable to load the weather forecast.", error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [props.city]);

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay
                    data={dailyForecast}
                    temperatureUnit={props.temperatureUnit}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
  return null;
}
