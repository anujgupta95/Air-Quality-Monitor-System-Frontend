import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/AirQualityCard.css";

const AirQualityCard = ({ location, country, aqi, status, pm25, pm10, no2, o3, forecastData_Card }) => {
  // Chart Data
  const data = {
    // labels: forecastData_Card.time, // Array of time points
    datasets: [
      {
        label: "AQI Forecast",
        data: forecastData_Card.values, // Array of AQI values
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart Options
  const options = {
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E0E0E0" },
        ticks: { font: { size: 12 } },
      },
    },
    plugins: { legend: { display: false } },
    responsive: true,
  };

  return (
    <div className="air-quality-card">
      <div className="card-header">
        <div className="status">
          <span role="img" aria-label="status">
            😊
          </span>
          {status}
        </div>
        <h2>{location}</h2>
        <p>{country}</p>
      </div>
      <div className="card-body">
        <div className="aqi-circle">
          <div className="circle">
            <span className="aqi-value">{aqi}</span>
            <span className="aqi-label">AQI</span>
          </div>
        </div>
        <div className="pollutants">
          <div className="pollutant">
            <h4>PM2.5</h4>
            <p>{pm25} µg/m³</p>
          </div>
          <div className="pollutant">
            <h4>PM10</h4>
            <p>{pm10} µg/m³</p>
          </div>
          <div className="pollutant">
            <h4>NO₂</h4>
            <p>{no2} µg/m³</p>
          </div>
          <div className="pollutant">
            <h4>O₃</h4>
            <p>{o3} µg/m³</p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <h4>Air Quality Forecast</h4>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AirQualityCard;
