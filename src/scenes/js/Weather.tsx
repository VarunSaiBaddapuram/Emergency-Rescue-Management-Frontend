import React, { useState } from "react";
import WeatherData from "./WeatherData";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import { WeatherInfo } from "../../types/weather.types";
import "../css/Weather.css";

interface WeatherProps {
  defaultCity: string;
}

interface WeatherDataState extends Partial<WeatherInfo> {
  ready: boolean;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const Weather: React.FC<WeatherProps> = ({ defaultCity }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataState>({ ready: false });
  const [city, setCity] = useState<string>(defaultCity);

  const handleResponse = (response: any) => {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      wind: response.data.wind.speed,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search();
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const search = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl)
      .then(handleResponse)
      .catch(err => {
        console.error("Weather search error:", err);
      });
  };

  if (weatherData.ready && weatherData.city) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus={true}
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherData data={weatherData as WeatherInfo} />
        {weatherData.coordinates && (
          <WeatherForecast coordinates={weatherData.coordinates} />
        )}
      </div>
    );
  } else {
    search();
    return <div className="p-3 text-center">Loading weather data...</div>;
  }
}

export default Weather;
