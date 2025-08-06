import { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../services/openWeatherService";
import GetGeoLocationService from "../services/getGeoLocationService";
import { getLocationNameByLatAndLon } from "../services/getLocationNameByLatAndLong";
import { useWeatherStore } from "../store";
import { FiWind } from "react-icons/fi";
import GetDayTime from "../utils/datetime";
import "./styles.scss";
import LocationButton from "./LocationButton";
const GeneralInfo = () => {
  const { weatherData, setCity, setWeatherData } = useWeatherStore();
  const [selectedPeriod, setSelectedPeriod] = useState("5");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lon } = await GetGeoLocationService();
        const weatherData = await getWeatherByCoordinates(lat, lon);
        const cityName = await getLocationNameByLatAndLon(lat, lon);
        setCity(cityName.name);
        setWeatherData(weatherData);
        GetDayTime(weatherData.current.dt);
      } catch (error) {
        console.error("No se pudo obtener la ubicación:", error);
      }
    };
    fetchData();
  }, []);

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    console.log(`${period} days selected`);
  };

  return (
    <>
      <div className="w-[20vw] h-screen bg-white/5 backdrop-blur-md border border-white/20 px-4 text-black placeholder-black/70 shadow-lg">
        <div className="flex flex-col items-center">
          <LocationButton />
          <div>
            <p className="temperatura pl-8 relative z-10 text-white">
              {Number(weatherData?.current.temp).toFixed(0)}&deg;
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FiWind size={30} className="text-white" />
            <span className="viento opacity-70 text-white">
              {Number(weatherData?.current.wind_speed).toFixed(1)}km/h
            </span>
          </div>
          <hr className="my-6 border-t-2 border-white/20 w-full" />
        </div>
        <div className="flex flex-col items-center">
          <p className="forecastTitle pb-4 text-white">The Next Days Forecast</p>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-black font-medium backdrop-blur-sm ${
                selectedPeriod === "5"
                  ? "bg-black/20"
                  : "hover:bg-black/10 active:bg-black/20"
              }`}
              onClick={() => handlePeriodSelect("5")}
            >
              5 days
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-black font-medium backdrop-blur-sm ${
                selectedPeriod === "15"
                  ? "bg-black/20"
                  : "hover:bg-black/10 active:bg-black/20"
              }`}
              onClick={() => handlePeriodSelect("15")}
            >
              15 days
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-black font-medium backdrop-blur-sm ${
                selectedPeriod === "30"
                  ? "bg-black/20"
                  : "hover:bg-black/10 active:bg-black/20"
              }`}
              onClick={() => handlePeriodSelect("30")}
            >
              30 days
            </button>
          </div>
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
