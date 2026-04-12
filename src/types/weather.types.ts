export interface WeatherInfo {
  city: string;
  date: Date;
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  wind: number;
}

export interface ForecastRow {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: Array<{
    icon: string;
  }>;
}
