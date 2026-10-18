import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const iconMap = {
  "01d": "CLEAR_DAY",
  "01n": "CLEAR_NIGHT",
  "02d": "PARTLY_CLOUDY_DAY",
  "02n": "PARTLY_CLOUDY_NIGHT",
  "03d": "CLOUDY",
  "03n": "CLOUDY",
  "04d": "CLOUDY",
  "04n": "CLOUDY",
  "09d": "RAIN",
  "09n": "RAIN",
  "10d": "RAIN",
  "10n": "RAIN",
  "11d": "SLEET",
  "11n": "SLEET",
  "13d": "SNOW",
  "13n": "SNOW",
  "50d": "FOG",
  "50n": "FOG",
  "clear-sky-day": "CLEAR_DAY",
  "clear-sky-night": "CLEAR_NIGHT",
  "few-clouds-day": "PARTLY_CLOUDY_DAY",
  "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
  "scattered-clouds-day": "CLOUDY",
  "scattered-clouds-night": "CLOUDY",
  "broken-clouds-day": "CLOUDY",
  "broken-clouds-night": "CLOUDY",
  "overcast-clouds": "CLOUDY",
  "rain-day": "RAIN",
  "rain-night": "RAIN",
  "moderate-rain-day": "RAIN",
  "moderate-rain-night": "RAIN",
  "snow-day": "SNOW",
  "snow-night": "SNOW",
  "thunderstorm-day": "SLEET",
  "thunderstorm-night": "SLEET",
  mist: "FOG",
};

export default function WeatherIcon(props) {
  const icon = iconMap[props.code] || "CLEAR_DAY";

  return (
    <ReactAnimatedWeather
      icon={icon}
      color="#1e1e1e"
      size={props.size}
      animate={true}
    />
  );
}