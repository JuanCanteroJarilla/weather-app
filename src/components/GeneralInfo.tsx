import { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../services/openWeatherService";
import GetGeoLocationService from "../services/getGeoLocationService";
import { useWeatherStore } from "../store";
import { FiWind } from "react-icons/fi";
import GetDayTime from "../utils/datetime";
import "./styles.scss";
const GeneralInfo = () => {
  const { city, weatherData, setCity, setWeatherData } = useWeatherStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lon } = await GetGeoLocationService();
        const weatherData = await getWeatherByCoordinates(lat, lon);
        console.log("Weather Data:", weatherData);
        setWeatherData(weatherData);
        GetDayTime(weatherData.current.dt)
      } catch (error) {
        console.error("No se pudo obtener la ubicación:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setCity(data.name); // Actualiza el nombre de la ciudad cuando los datos cambian
  //     console.log(data);
  //     setWeatherData(data); // Actualiza los datos del clima
  //   }
  // }, [data]);
  return (
    <>
      <div className="w-[20vw] h-screen bg-white/5 backdrop-blur-md border border-white/20 px-4 text-black placeholder-black/70 shadow-lg">
        <div className="flex flex-col items-center">
          {/* <p className="ciudad p-2">Weather in {city}</p> */}
          <p className="temperatura pl-8">
            {Number(weatherData?.current.temp).toFixed(0)}&deg;
          </p>
          <div className="flex flex-row items-center gap-2">
            <FiWind size={30} />
            <span className="viento opacity-70">
              {Number(weatherData?.current.wind_speed).toFixed(1)}km/h
            </span>
          </div>
          <hr className="my-6 border-t-2 border-black/20 w-full" />
        </div>
        <div className="flex flex-col items-center">
          <p className="forecastTitle">The Next Days Forecast</p>
        </div>
        {/* <div className="flex flex-col items-center">
          <MdOutlineWbSunny size={64} />
          <p className="tiempo">{weatherData?.weather[0].description}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p></p>
        </div> */}
      </div>
    </>
  );
};

export default GeneralInfo;
