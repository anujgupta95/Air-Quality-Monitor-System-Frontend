import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Chart.css";

const LineChart = ({ dataPoints, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "CO₂ (ppm)",
        data: dataPoints.co2,
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        pointBackgroundColor: "#FF5722",
        fill: false,
        tension: 0.4, // Makes the line smooth
      },
      {
        label: "PM2.5 (µg/m³)",
        data: dataPoints.pm25,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
        fill: true,
        tension: 0.4, // Makes the line smooth
      },
      {
        label: "NO₂ (ppb)",
        data: dataPoints.no2,
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        pointBackgroundColor: "#2196F3",
        fill: true,
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: false, // Hide the y-axis values
        grid: {
          display: false, // Optional: Hide y-axis grid lines
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
        <h3>Air Quality Forecast</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
