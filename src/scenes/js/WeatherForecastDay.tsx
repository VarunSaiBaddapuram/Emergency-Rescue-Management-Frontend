import React from "react";
import WeatherIcon from "./WeatherIcon";
import { ForecastRow } from "../../types/weather.types";

interface WeatherForecastDayProps {
  data: ForecastRow;
}

const WeatherForecastDay: React.FC<WeatherForecastDayProps> = ({ data }) => {
  const maxTemp = () => {
    const temperature = Math.round(data.temp.max);
    return `${temperature}°`;
  };

  const minTemp = () => {
    const temperature = Math.round(data.temp.min);
    return `${temperature}°`;
  };

  const day = () => {
    const date = new Date(data.dt * 1000);
    const day = date.getDay();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  };

  return (
    <div>
      <div className="WeatherForecast-day">{day()}</div>
      <WeatherIcon code={data.weather[0].icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">{maxTemp()}</span>
        <span className="WeatherForecast-temperature-min">{minTemp()}</span>
      </div>
    </div>
  );
}

export default WeatherForecastDay;
