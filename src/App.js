import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <Weather defaultCity="New York" />

        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/fabelanorma3010"
            target="_blank"
            rel="noreferrer"
          >
            Norma Fabela
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/fabelanorma3010/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            hosted on vercel
          </a>
        </footer>
      </div>
    </div>
  );
}
