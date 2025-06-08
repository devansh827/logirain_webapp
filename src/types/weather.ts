export interface WeatherInput {
  location: string;
  min_temp: number;
  max_temp: number;
  rainfall: number;
  evaporation?: number;
  sunshine?: number;
  wind_gust_speed?: number;
  wind_speed_9am?: number;
  wind_speed_3pm?: number;
  humidity_9am?: number;
  humidity_3pm?: number;
  pressure_9am?: number;
  pressure_3pm?: number;
  cloud_9am?: number;
  cloud_3pm?: number;
  temp_9am?: number;
  temp_3pm?: number;
  rain_today: string;
}

export interface PredictionResponse {
  prediction: string;
  probability: number;
  confidence: string;
}

export interface WeatherStats {
  avg_min_temp: number;
  avg_max_temp: number;
  avg_rainfall: number;
  avg_humidity_9am: number;
  avg_humidity_3pm: number;
  rain_days_percentage: number;
}