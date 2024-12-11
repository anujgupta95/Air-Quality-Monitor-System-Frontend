import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const API_KEY = "5796abbde9106b7da4febfae8c44c232";

// Function to get color based on AQI value
const getAqiColor = (aqi) => {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "yellow";
  if (aqi <= 150) return "orange";
  if (aqi <= 200) return "red";
  if (aqi <= 300) return "purple";
  return "maroon"; // For hazardous
};

const Map = () => {
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.209 }); // Default center: Delhi
  const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.209 });
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of the map
  const [aqiData, setAqiData] = useState([]); // State to store AQI data from API

  // Fetch AQI data when component mounts or updates
  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        // Simulate the API response with the dummy data
        const dummyData = {
          data: [
            {
              sensor_id: "3",
              lat: 28.7030,
              lon: 77.1030,
              aqi: 110,
              co2: 460,
              pm25: 18,
              no2: 55,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "4",
              lat: 28.7000,
              lon: 77.1005,
              aqi: 75,
              co2: 430,
              pm25: 16,
              no2: 38,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "5",
              lat: 28.7083,
              lon: 77.1065,
              aqi: 140,
              co2: 490,
              pm25: 22,
              no2: 60,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "6",
              lat: 28.7022,
              lon: 77.1077,
              aqi: 150,
              co2: 510,
              pm25: 23,
              no2: 62,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "7",
              lat: 28.7090,
              lon: 77.1080,
              aqi: 95,
              co2: 440,
              pm25: 20,
              no2: 48,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "8",
              lat: 28.7105,
              lon: 77.1100,
              aqi: 85,
              co2: 420,
              pm25: 17,
              no2: 45,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "9",
              lat: 28.7110,
              lon: 77.1120,
              aqi: 120,
              co2: 470,
              pm25: 19,
              no2: 52,
              timestamp: "2024-12-11T10:00:00Z"
            },
            {
              sensor_id: "10",
              lat: 28.7130,
              lon: 77.1140,
              aqi: 50,
              co2: 410,
              pm25: 13,
              no2: 33,
              timestamp: "2024-12-11T10:00:00Z"
            }
          ],
          status: "success",
          message: "Data fetched successfully"
        };

        setAqiData(dummyData.data); // Assuming setAqiData is used to store the response
      } catch (error) {
        console.error("Error fetching AQI data:", error);
        alert("Failed to fetch AQI data. Please try again.");
      }
    };

    fetchAqiData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value.trim();

    if (!location) {
      alert("Please enter a city name.");
      return;
    }

    try {
      // Fetch city coordinates using OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "200" && data.list.length > 0) {
        const { lat, lon } = data.list[0].coord;
        setCenter({ lat, lng: lon });
        setMarkerPosition({ lat, lng: lon });

        setMapKey((prevKey) => prevKey + 1); // Force re-render
      } else {
        alert("City not found.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      alert("Failed to fetch city coordinates. Please try again.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Map Container */}
      <MapContainer
        key={mapKey} // Set the key to force re-render of the map
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Loop through AQI data and plot circles */}
        {aqiData.map((sensor, index) => {
          const { lat, lon, aqi } = sensor; // Destructure the data
          const color = getAqiColor(aqi); // Get the color based on AQI

          return (
            <Circle
              key={index}
              center={[lat, lon]}
              radius={500} // Set radius size based on your preference
              fillColor={color}
              color={color}
              fillOpacity={0.6}
            >
              <Popup>
                <strong>AQI: {aqi}</strong>
                <br />
                Latitude: {lat}
                <br />
                Longitude: {lon}
              </Popup>
            </Circle>
          );
        })}

        <Marker position={[markerPosition.lat, markerPosition.lng]}>
          <Popup>Drag me or search for a city!</Popup>
        </Marker>
      </MapContainer>

      {/* Search Bar */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            name="location"
            placeholder="Search for a city..."
            style={{
              width: "300px",
              height: "40px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Map;
