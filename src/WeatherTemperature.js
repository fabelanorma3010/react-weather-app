import React from "react";
import { convertTemperature } from "./temperature";

export default function WeatherTemperature(props) {
  const unit = props.unit || "celsius";

  return (
    <div className="WeatherTemperature">
      <span className="temperature">
        {convertTemperature(props.celsius, unit)}
      </span>
      <span className="unit">{unit === "fahrenheit" ? "°F" : "°C"}</span>
      <div className="temperature-units" role="group" aria-label="Temperature unit">
        <button
          type="button"
          aria-pressed={unit === "celsius"}
          onClick={() => props.onUnitChange("celsius")}
        >
          °C
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          aria-pressed={unit === "fahrenheit"}
          onClick={() => props.onUnitChange("fahrenheit")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
