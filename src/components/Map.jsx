import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define OpenWeatherMap API key (replace with your actual key)
const API_KEY = "5796abbde9106b7da4febfae8c44c232";

const Map = () => {

    const [center, setCenter] = useState({
        lat: 28.6139, // Default center: Delhi
        lng: 77.209,
      });
      const [markerPosition, setMarkerPosition] = useState({
        lat: 28.6139,
        lng: 77.209,
      });
      const [mapKey, setMapKey] = useState(0); // Key to force re-render of the map
    
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
            `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(
              location
            )}&appid=${API_KEY}&units=metric`
          );
    
          const data = await response.json();
    
          if (data.cod === "200" && data.list.length > 0) {
            const { lat, lon } = data.list[0].coord;
            console.log("City coordinates:", lat, lon);
    
            // Update map center and marker position
            setCenter({ lat, lng: lon });
            setMarkerPosition({ lat, lng: lon });
    
            // Force re-render of the map by updating the key
            setMapKey((prevKey) => prevKey + 1);
          } else {
            alert("City not found.");
          }
        } catch (error) {
          console.error("Error fetching city data:", error);
          alert("Failed to fetch city coordinates. Please try again.");
        }
      };
    
      // Create a custom icon for the marker
      const customMarkerIcon = new L.Icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/64/64113.png", // Custom marker icon URL
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

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
      <Marker
        position={[markerPosition.lat, markerPosition.lng]}
        icon={customMarkerIcon}
        draggable={true} // Allow dragging the marker
        eventHandlers={{
          dragend: (event) => {
            const newPosition = event.target.getLatLng();
            setMarkerPosition(newPosition);
          },
        }}
      >
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
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "230px",
          left: "200px",
          transform: "translateY(-50%)",
          zIndex: 1000, // Ensure the search bar stays on top of the map
          display: "flex",
          alignItems: "center",
          backgroundColor: "white", // Optional: Background for better visibility
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better aesthetics
        }}
        
      >
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
  )
}

export default Map
