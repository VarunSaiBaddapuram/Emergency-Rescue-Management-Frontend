import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import { ForecastRow } from "../../types/weather.types";
import "../css/WeatherForecast.css";

interface WeatherForecastProps {
  coordinates: {
    lat: number;
    lon: number;
  };
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ coordinates }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [forecast, setForecast] = useState<ForecastRow[] | null>(null);

  useEffect(() => {
    setLoaded(false);
  }, [coordinates]);

  const handleResponse = (response: any) => {
    setForecast(response.data.daily);
    setLoaded(true);
  };

  const load = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const { lat, lon } = coordinates;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse).catch(err => {
        console.error("Forecast error:", err);
    });
  };

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map((dailyForecast, index) => {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();
    return null;
  }
}

export default WeatherForecast;
