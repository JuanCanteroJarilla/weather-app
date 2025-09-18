import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WeatherData {
  current: {
    temp: number;
    wind_speed: number;
    dt: number;
    weather?: { main: string; description: string }[];
  };
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: { main: string }[];
  }>;
  lat?: number;
  lon?: number;
}

interface ForecastData {
  [period: string]: any;
}

interface WeatherState {
  city: string;
  weatherData: WeatherData | null;
  forecastData: ForecastData;
  setCity: (city: string) => void;
  setWeatherData: (data: WeatherData) => void;
  setForecastData: (period: string, data: any) => void;
}

export const useWeatherStore = create<WeatherState>()(
  devtools((set) => ({
    city: "-",
    weatherData: null,
    forecastData: {},
    setCity: (city) => set({ city }),
    setWeatherData: (data) => set({ weatherData: data }),
    setForecastData: (period, data) =>
      set((state) => ({
        forecastData: {
          ...state.forecastData,
          [period]: data,
        },
      })),
  }))
);
