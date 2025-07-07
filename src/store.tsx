import { create } from "zustand";

interface WeatherState {
  city: string;
  weatherData: any;
  forecastData: any;
  setCity: (city: string) => void;
  setWeatherData: (data: any) => void;
  setForecastData: (data: any) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  city: "-",
  weatherData: null,
  forecastData: null,
  setCity: (city) => set({ city }),
  setWeatherData: (data) => set({ weatherData: data }),
  setForecastData: (data) => set({ forecastData: data }),
}));