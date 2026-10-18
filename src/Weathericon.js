import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherIcon({ icon = "CLEAR_DAY" }) {
  return (
    <ReactAnimatedWeather
      icon={icon}
      color="red"
      size={64}
      animate={true}
    />
  );
}