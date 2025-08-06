import axios from "axios";

const API_KEY = "32950239ec792cbebc53e2b678195efa"; // Reemplaza con tu clave real
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
// https://api.openweathermap.org/data/3.0/onecall?lat=41.9730661&lon=2.8215514&appid=32950239ec792cbebc53e2b678195efa
export const getLocationNameByLatAndLon = async (lat, lon) => {
  try {
    const q = `lat=${lat}&lon${lon}`;
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        lang: "es", // Opcional: para respuestas en español
      },
    });
    return response.data;
  } catch (error) {
    // Manejo básico de errores
    throw error;
  }
};

export const getWeatherByCoordinates = async (
  latitude: number,
  longitude: number
) => {
  try {
    const q = `lat=${latitude}&lon=${longitude}`;
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
    // Manejo básico de errores
    throw error;
  }
};
