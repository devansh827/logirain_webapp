import axios from 'axios';
import { WeatherInput, PredictionResponse, WeatherStats } from '../types/weather';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherAPI = {
  getLocations: async (): Promise<string[]> => {
    const response = await api.get('/locations');
    return response.data.locations;
  },

  getWeatherStats: async (location: string): Promise<WeatherStats> => {
    const response = await api.get(`/weather-stats/${location}`);
    return response.data;
  },

  predictRain: async (weatherData: WeatherInput): Promise<PredictionResponse> => {
    const response = await api.post('/predict', weatherData);
    return response.data;
  },
};