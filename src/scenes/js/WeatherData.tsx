import React from "react";
import FormatDate from "./FormatDate";
import WeatherIcon from "./WeatherIcon";
import Temperature from "./Temperature";
import { WeatherInfo } from "../../types/weather.types";
import "../css/Weather.css";

interface WeatherDataProps {
  data: WeatherInfo;
}

const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
  return (
    <div className="WeatherData">
      <div className="row">
        <div className="col-6">
          <h1 className="text-secondary">{data.city}</h1>
          <ul className="list-unstyled">
            <li>
              <FormatDate date={data.date} />
            </li>
            <li className="text-capitalize">{data.description}</li>
          </ul>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <div className="me-3">
            <WeatherIcon code={data.icon} size={52} />
          </div>
          <div>
            <Temperature celsius={data.temperature} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6">
          <ul className="list-unstyled text-muted">
            <li>Humidity: {data.humidity}%</li>
            <li>Wind: {data.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
