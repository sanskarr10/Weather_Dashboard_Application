import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      const res = await fetch(`${API_URL}/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setError("");
        setWeather(data);
      }
    } catch (err) {
      setError("Network error: " + err.message);
      setWeather(null);
    }
  };

  return (
    <div
  style={{
    padding: "24px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}
>
  <h2 style={{ color: "#00796b", marginBottom: "20px" }}>🌦 Mini Weather Dashboard</h2>

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      background: "#ffffff",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}
  >
    <input
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name (e.g. London)"
      style={{
        padding: "10px",
        width: "220px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "14px"
      }}
    />
    <button
      onClick={fetchWeather}
      style={{
        padding: "10px 16px",
        background: "#00796b",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.3s"
      }}
      onMouseOver={(e) => (e.target.style.background = "#004d40")}
      onMouseOut={(e) => (e.target.style.background = "#00796b")}
    >
      Get Weather
    </button>
  </div>

  {error && (
    <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>{error}</p>
  )}

  {weather && (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        width: "300px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#00796b" }}>{weather.city}</h3>
      <p style={{ margin: "6px 0", fontSize: "15px" }}>
        🌡 Temperature: <strong>{weather.temperature}°C</strong>
      </p>
      <p style={{ margin: "6px 0", fontSize: "15px" }}>
        ☁ Condition: <strong>{weather.description}</strong>
      </p>
      <p style={{ margin: "6px 0", fontSize: "15px" }}>
        💧 Humidity: <strong>{weather.humidity}%</strong>
      </p>
      <p style={{ margin: "6px 0", fontSize: "15px" }}>
        💨 Wind Speed: <strong>{weather.wind_speed} m/s</strong>
      </p>
    </div>
  )}
</div>
  );
}

export default App;
