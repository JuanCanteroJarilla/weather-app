import { useEffect } from "react";
import { useWeatherStore } from "../store";
import {
  BsClouds,
  BsCloudRain,
  BsCloudLightningRain,
  BsCloudSnow,
  BsSun,
} from "react-icons/bs";
import HourlyForecastCards from "./HourlyForecastCards";

function ActualMeteoWithHourlyForecast() {
  const { weatherData } = useWeatherStore();

  let weatherIcon = {
    Clear: <BsSun size={32} color="white" />,
    Clouds: <BsClouds size={32} color="white" />,
    Rain: <BsCloudRain size={32} color="white" />,
    Snow: <BsCloudSnow size={32} color="white" />,
    Thunderstorm: <BsCloudLightningRain size={32} color="white" />,
  };

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className="mt-[54vh] ml-8 self-start z-20">
        <p className="description bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {weatherData?.current.weather[0].description
            ? capitalizeWords(weatherData.current.weather[0].description)
            : ""}
        </p>
      </div>
      <hr className="border-t-2 border-white/15 my-2 mx-8" />
      {weatherData && <HourlyForecastCards hourlyData={weatherData.hourly} />}
    </>
  );
}

export default ActualMeteoWithHourlyForecast;
