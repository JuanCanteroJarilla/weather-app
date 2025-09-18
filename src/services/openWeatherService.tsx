import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";



export const getWeatherByCoordinates = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
        lang: "es",
      },
    });
    console.log("Response from OpenWeather API:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
