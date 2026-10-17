import React from "react";
import Weather from "./Weather";
import "./App.css";

export default fuction App() {
return(
<div className="App">
<div className="container">
<h1>Weather App</h1>
<Weather/>
<footer>
   This project was coded by{" "}
   <a href="https://github.com/fabelanorma3010" target="_blank">
   norma Fabela
     </a>{" "}
   and is{" "}
    <a
    href="https://github.com/fabelanorma3010/react-weather-app"
    target="_blank"
     >
    open-sourced on Github
     </a>
     </footer>
    </div>
  );
}
