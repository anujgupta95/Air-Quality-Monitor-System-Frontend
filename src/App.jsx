import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./components/navbar";
import Map from "./components/map";
import GaugeChart from "./components/GaugeChart";
import LineChart from "./components/LineChart";
import AirQualityCard from "./components/AirQualityCard";
import "./App.css";

// Initialize the Socket.IO client
const socket = io("https://socket-io-v1.onrender.com"); // Replace with your backend URL

const App = () => {
  // State to hold air quality data
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const cityName = "Bhilai"; // Hardcoded example city name

    // Emit an event to request data for the city
    socket.emit("fetch-city-data", cityName);

    // Listen for real-time updates from the backend
    socket.on("update-data", (newData) => {
      console.log("Received real-time data:", newData);

      // Find the city information in the data
      const city = newData?.data?.cities?.find((c) => c.cityName === cityName);

      // Update the state if city data is found
      if (city) {
        setCityData(city);
      }
    });

    // Clean up Socket.IO listeners when the component unmounts
    return () => {
      socket.off("update-data");
    };
  }, []);

  if (!cityData) {
    return <div>Loading...</div>; // Display a loading state while data is loading
  }

  // Extract relevant data from cityData
  const { cityName, countryName, airComponents } = cityData;
  const aqi = airComponents.find((c) => c.senDevId === "aqi")?.sensorData || 0;
  const pm25 = airComponents.find((c) => c.senDevId === "pm25")?.sensorData || 0;
  const pm10 = airComponents.find((c) => c.senDevId === "pm10")?.sensorData || 0;
  const no2 = airComponents.find((c) => c.senDevId === "no2")?.sensorData || 0;
  const o3 = airComponents.find((c) => c.senDevId === "o3")?.sensorData || 0;

  // Generate dummy forecast data for the LineChart
  const forecastLabels = ["04:00", "05:00", "06:00", "07:00", "08:00", "09:00"];
  const forecastData = {
    co2: [400, 420, 430, 450, 470, 480], // Replace with actual forecast data if available
    pm25: [pm25, pm25 + 2, pm25 + 4, pm25 + 6, pm25 + 8, pm25 + 10],
    no2: [no2, no2 + 2, no2 + 4, no2 + 6, no2 + 8, no2 + 10],
  };

  const forecastDataCard = {
    time: forecastLabels,
    values: [pm25, pm25 + 5, pm25 + 10, pm25 + 15, pm25 + 20, pm25 + 25],
  };

  return (
    <div>
      <Navbar />
      <Map />
      <div className="graphs">
        <GaugeChart value={aqi} />
        <LineChart dataPoints={forecastData} labels={forecastLabels} />
      </div>
      {/* <div style={{ padding: "16px", display: "flex", justifyContent: "center" }}>
        <AirQualityCard
          location={cityName}
          country={countryName}
          aqi={aqi}
          status={aqi <= 50 ? "Very Good" : "Moderate"}
          pm25={pm25.toFixed(2)}
          pm10={pm10.toFixed(2)}
          no2={no2.toFixed(2)}
          o3={o3.toFixed(2)}
          forecastData={forecastDataCard}
        />
      </div> */}
    </div>
  );
};

export default App;
