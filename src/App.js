import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Inserisci una città valida.");
      setWeather(null);
      return;
    }

    const apiKey = "9789408f6e0bd8955725aed21c32efcd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Città non trovata!");
      setWeather(null);
    }
  };

  return (<>
    <video autoPlay loop muted className="bg-video">
  <source src="/video.mp4" type="video/mp4" />
</video>
    <div className="app">
      <h1 className="title">Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Inserisci una città"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Cerca</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
        </div>
      )}
    </div></>
  );
}

export default App;
