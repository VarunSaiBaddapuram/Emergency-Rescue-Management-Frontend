declare module 'react-animated-weather' {
  import React from 'react';

  interface ReactAnimatedWeatherProps {
    icon: string;
    color: string;
    size: number;
    animate: boolean;
  }

  const ReactAnimatedWeather: React.FC<ReactAnimatedWeatherProps>;
  export default ReactAnimatedWeather;
}
