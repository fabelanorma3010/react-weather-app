import React from "react";
import axios from "axios";
import " ./weather.css"

export default function Weather() { 
return (
 <div className="Weather">
<form>
<div className="row mt-3">
<div className="col-6">
<input
type="search"
placeholder="Enter a city.."
className="form-control"
autofocus="on"
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
 <h1>New York</h1>
 <ul>
 <li>Wendnesday 07:00</li>
 <li>Mostly Cloudy</li>
 </ul>
 <div className="row mt-3">
<div className="col-6">
<img
src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
alt="Mostly Cloudy"
className="float-left"
/>
6
<div className="float-left">
<span className="temperature">6</span>
<span className="unit">c</span>
</div>
</div>
</div>
<div className="col-6">
<ul>
<li></li>
</ul>
</div>
