import React from "react";
import Navbar from "./components/navbar";
import Map from "./components/map";
import GaugeChart from "./components/GaugeChart";
import LineChart from "./components/LineChart";
import "./App.css";

const App = () => {

  const aqiValue = 20;
  const forecastLabels = [
    "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", 
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"
  ];
  
  const forecastData = {
    co2: [400, 420, 430, 450, 470, 480, 500, 520, 540, 560, 580, 600],
    pm25: [12, 14, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38],
    no2: [30, 28, 32, 35, 37, 40, 42, 45, 48, 50, 52, 55],
  };
  

  return (
    <div>
      <Navbar />
      <Map />
      <div className="graphs">
      <GaugeChart value={aqiValue} />
      <LineChart dataPoints={forecastData} labels={forecastLabels} />
      </div>
    </div>
  );
};

export default App;
