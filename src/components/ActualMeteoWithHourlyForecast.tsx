import { useEffect } from "react";
import { useWeatherStore } from "../store";
import { BsClouds, BsCloudRain } from "react-icons/bs";

function ActualMeteoWithHourlyForecast() {
  const { weatherData } = useWeatherStore();

  useEffect(() => {
    console.log("Weather Data:", weatherData);
  }, [weatherData]);

  let weatherToVideo = {
    Clear: null,
    Clouds: <BsClouds size={32} color="white" />,
    Rain: <BsCloudRain size={32} color="white" />,
    Snow: null,
    Thunderstorm: null,
  };

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className="mt-[54vh] ml-8 self-start z-20">
        <p className="description">
          {weatherData?.current.weather[0].description
            ? capitalizeWords(weatherData.current.weather[0].description)
            : ""}
        </p>
      </div>
      <hr className="border-t-2 border-white/15 my-2 mx-8" />
      <div className="flex flex-row gap-4 ml-8 mt-4">
        {weatherData?.hourly?.slice(1, 11).map((hour, idx) => (
          <div
            key={idx}
            className="bg-white/5 w-[3.5vw] flex flex-col rounded-lg items-center"
          >
            <span className="temperaturaHourly">
              {new Date(hour.dt * 1000).getHours()}:00
            </span>
            <hr className="relative w-8 border-white/15 border-t-2 my-1" />
            <div className="bg-white/15 w-[2.5vw] p-1 mt-2 rounded-lg flex flex-col items-center justify-center">
              {weatherToVideo[hour.weather[0]?.main]}
            </div>
            <span className="p-1 temperaturaHourly font-semibold">
              {Math.round(hour.temp)}&deg;
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ActualMeteoWithHourlyForecast;
