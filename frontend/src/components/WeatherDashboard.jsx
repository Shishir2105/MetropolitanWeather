import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react'

import WeatherIcon from './WeatherIcon.jsx'
import WeatherCard from './WeatherCard.jsx'
import WeatherLoader from './WeatherLoader.jsx'

export default function WeatherDashboard() {
  const [currentWeather, setWeatherData] = useState([]);
  const [forecast, setWeatherForecast] = useState([]);
  const [summary, setWeatherSummary] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [city, setCity] = useState(useParams().city);

  const fetchLocation = async (place) => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      console.log("Geocoding city:", city, "using OpenWeather Geocoding API");
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log("Found coordinates:", lat, lon);
        setLocation({ lat, lon });
      } else {
        console.warn("No geocoding results found for city:", city);
        setError(`No coordinates found for "${city}". Please check the spelling.`);
        setFlag(true);
      }
    } catch (error) {
      console.error('Unable to fetch location:', error);
      setError(`Geocoding lookup failed: ${error.message}. Please check if VITE_API_KEY in frontend/.env is your valid OpenWeather API key.`);
      setFlag(true);
    }
  };

  const fetchData = async () => {
    try {
      setError(null);
      const data = await getWeatherData();
      setWeatherData(data);
      const forecastData = await getWeatherForecast();
      setWeatherForecast(forecastData);
      const summaryData = await getWeatherSummary();
      setWeatherSummary(summaryData);
      setFlag(true);
    } catch (err) {
      console.error("Error in fetchData:", err);
      setError(err.message || "Failed to retrieve weather data from local server.");
      setFlag(true);
    }
  };

  useEffect(() => {
    fetchLocation(city);
  }, [city]);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchData();
    }
  }, [location]);

  const { lat, lon } = location;

  const getWeatherData = async () => {
    console.log("Requesting weather data for:", lat, lon);
    const res = await axios.post('http://localhost:3000/getCurrentInfo', { lat, lon });
    return res;
  };

  const getWeatherForecast = async () => {
    console.log("Requesting weather forecast for:", lat, lon);
    const res = await axios.post('http://localhost:3000/getFiveDayInfo', { lat, lon });
    return res;
  };

  const getWeatherSummary = async () => {
    console.log("Requesting AI summary for:", lat, lon);
    const res = await axios.post('http://localhost:3000/summarizeWeather', { lat, lon });
    return res;
  };

  const [showForecast, setShowForecast] = useState(false)

  const toggleForecast = () => setShowForecast(!showForecast)

  return (
    <>
      {!flag &&
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
          <WeatherLoader size="large" />
        </div>
      }
      {flag && error && (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Connection / Loading Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <p className="text-sm text-gray-500 mb-6">
              Make sure your backend server is running locally on port 3000, and your database connection is successful.
            </p>
            <a href="/" className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Go Back Home
            </a>
          </div>
        </div>
      )}
      {flag && !error &&
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary animate-fade-in">
            Weather Dashboard - {city}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WeatherCard
              title="Temperature"
              value={`${(currentWeather.data.main?.temp - 273.15).toFixed(1)}°C`}
              icon={<Thermometer className="w-10 h-10 text-red-500" />}
            />
            <WeatherCard
              title="Humidity"
              value={`${currentWeather.data.main?.humidity}%`}
              icon={<Droplets className="w-10 h-10 text-blue-500" />}
            />
            <WeatherCard
              title="Wind Speed"
              value={`${currentWeather.data.wind?.speed} m/s`}
              icon={<Wind className="w-10 h-10 text-gray-500" />}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Current Weather</h2>
            <div className="flex items-center space-x-4">
              <WeatherIcon main={currentWeather.data.weather[0].main} />
              <div>
                <p className="text-xl font-semibold">{currentWeather.data.weather[0].description}</p>
                <p className="text-gray-600">Feels like: {(currentWeather.data.main.feels_like - 273.15).toFixed(1)}°C</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Weather Summary</h2>
            <p className="text-gray-700 leading-relaxed"><Markdown>{summary.data.response}</Markdown></p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">5-Day Forecast</h2>
            <button
              onClick={toggleForecast}
              className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md mb-4 hover:bg-primary-dark transition-colors duration-300"
            >
              {showForecast ? 'Hide Forecast' : 'Show Forecast'}
            </button>
            {showForecast && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                {forecast.data.list.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                    <h3 className="font-semibold mb-2">
                      {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(day.dt * 1000))}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <WeatherIcon main={day.weather[0].main} />
                      <span>{day.weather[0].description}</span>
                    </div>
                    <p>Temp: {(day.main.temp - 273.15).toFixed(1)}°C</p>
                    <p>Humidity: {day.main.humidity}%</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}