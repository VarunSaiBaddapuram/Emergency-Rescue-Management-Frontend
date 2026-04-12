import React from "react";
import Weather from "./Weather";

const FloodPredict: React.FC = () => {
  return (
    <div className="App">
      <div className="container p-0">
        <Weather defaultCity="Hyderabad" />
      </div>
    </div>
  );
};

export default FloodPredict;
