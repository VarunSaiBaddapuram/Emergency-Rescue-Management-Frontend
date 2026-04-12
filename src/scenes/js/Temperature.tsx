import React, { useState } from "react";

interface TemperatureProps {
  celsius: number;
}

const Temperature: React.FC<TemperatureProps> = ({ celsius }) => {
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const showFahrenheit = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  const showCelsius = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setUnit("celsius");
  }

  const fahrenheit = () => {
    return (celsius * 9) / 5 + 32;
  }

  if (unit === "celsius") {
    return (
      <div className="Temperature">
        <span className="temperature">{Math.round(celsius)}</span>
        <span className="unit">
          °C |{" "}
          <a href="/" onClick={showFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div className="Temperature">
        <span className="temperature">{Math.round(fahrenheit())}</span>
        <span className="unit">
          <a href="/" onClick={showCelsius}>
            °C
          </a>{" "}
          | °F
        </span>
      </div>
    );
  }
}

export default Temperature;
