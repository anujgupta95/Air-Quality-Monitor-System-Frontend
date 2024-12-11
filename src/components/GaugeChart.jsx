import React from "react";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/Chart.css";

const GaugeChart = ({ value }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["AQI", ""],
        datasets: [
          {
            data: [value, 100 - value],
            backgroundColor: ["#00C853", "#E0E0E0"],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
          },
        ],
      },
      options: {
        cutout: "80%",
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
      <canvas ref={chartRef} width={200} height={100}></canvas>
      <div className="gauge-value">
        <h2>{value}</h2>
        <p>AQI</p>
      </div>
    </div>
  );
};

export default GaugeChart;
