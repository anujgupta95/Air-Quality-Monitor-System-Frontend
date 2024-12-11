import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/Chart.css";

const GaugeChart = ({ value }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a gradient for the gauge
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#00C853"); // Green
    gradient.addColorStop(0.25, "#FFEB3B"); // Yellow
    gradient.addColorStop(0.5, "#FF9800"); // Orange
    gradient.addColorStop(0.75, "#F44336"); // Red
    gradient.addColorStop(1, "#9C27B0"); // Purple

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["AQI", ""],
        datasets: [
          {
            data: [value, 100 - value],
            backgroundColor: [gradient],
            borderWidth: 0,
            circumference: 180, // Half doughnut
            rotation: 270, // Rotate to start from bottom
          },
        ],
      },
      options: {
        cutout: "80%", // Creates a ring effect
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [value]);

  return (
    <div className="gauge-chart-container">
      <h2>City Name</h2>
      <canvas ref={chartRef} />
      <div className="gauge-value">
        <h2>{value}</h2>
        <p>AQI</p>
      </div>
    </div>
  );
};

export default GaugeChart;
