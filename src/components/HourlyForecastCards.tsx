import { JSX } from "react";
import {
  BsClouds,
  BsCloudRain,
  BsCloudLightningRain,
  BsCloudSnow,
  BsSun,
} from "react-icons/bs";

interface HourlyWeather {
  dt: number;
  temp: number;
  weather: { main: string }[];
}

interface HourlyForecastCardsProps {
  hourlyData: HourlyWeather[];
}

const weatherIcon: Record<string, JSX.Element> = {
  Clear: <BsSun size={32} color="white" />,
  Clouds: <BsClouds size={32} color="white" />,
  Rain: <BsCloudRain size={32} color="white" />,
  Snow: <BsCloudSnow size={32} color="white" />,
  Thunderstorm: <BsCloudLightningRain size={32} color="white" />,
};

function HourlyForecastCards({ hourlyData }: HourlyForecastCardsProps) {
  if (!Array.isArray(hourlyData) || hourlyData.length === 0) return null;

  return (
    <div className="flex flex-row gap-4 ml-8 mt-4">
      {hourlyData.slice(1, 11).map((hour, idx) => (
        <div
          key={hour.dt}
          className="bg-white/5 w-[3.5vw] flex flex-col rounded-lg items-center"
        >
          <span className="temperaturaHourly pt-2">
            {new Date(hour.dt * 1000).getHours()}:00
          </span>
          <hr className="relative w-8 border-white/15 border-t-2 my-1" />
          <div className="bg-white/15 w-[2.5vw] p-1 mt-2 rounded-lg flex flex-col items-center justify-center">
            {weatherIcon[hour.weather[0]?.main] ?? (
              <BsClouds size={32} color="white" />
            )}
          </div>
          <span className="p-1 temperaturaHourly font-semibold">
            {Math.round(hour.temp)}&deg;
          </span>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecastCards;
