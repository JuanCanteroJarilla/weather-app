import React, { useEffect, useState } from "react";
import "./styles.scss";
import GetGeolocation from "../services/getGeoLocationService";
import GeneralInfo from "./GeneralInfo";
import ActualMeteoWithHourlyForecast from "./ActualMeteoWithHourlyForecast";
import DayTime from "./DayTime";
import { useWeatherStore } from "../store";


const Weather = () => {
  const { weatherData } = useWeatherStore();
  const [backgroundVideo, setBackgroundVideo] = useState(null);
 

  useEffect(() => {
    GetGeolocation();
  }, []);

  useEffect(() => {
    if (!weatherData) return;
    let weatherToVideo = {
      Clear: "/assets/images/soleado.mp4",
      Clouds: "/assets/images/nublado.mp4",
      Rain: "/assets/images/lluvioso.mp4",
      Snow: "/assets/images/nevado.mp4",
      Thunderstorm: "/assets/images/lluvioso.mp4",
    };
    let main = weatherData.current?.weather[0]?.main;

    setBackgroundVideo(weatherToVideo[main] || "/assets/images/default.mp4");
  }, [weatherData]);
  return (
    <div className="video-background-container">
      <div className="flex flex-row h-screen w-screen">
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        )}
        <GeneralInfo />
        <div className="flex flex-col flex-1">
          <div className="mt-8 mr-8 self-end">
            <DayTime />
          </div>
          <ActualMeteoWithHourlyForecast />
        </div>
      </div>
    </div>
  );
};

export default Weather;
