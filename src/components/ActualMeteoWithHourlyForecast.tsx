import { useWeatherStore } from "../store";
import HourlyForecastCards from "./HourlyForecastCards";

function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const ActualMeteoWithHourlyForecast = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  const description =
    weatherData.current?.weather?.[0]?.description
      ? capitalizeWords(weatherData.current.weather[0].description)
      : "";

  return (
    <section className="mt-[54vh] ml-8 self-start z-20">
      {description && (
        <p className="description bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {description}
        </p>
      )}
      <hr className="border-t-2 border-white/15 my-2 mx-8" />
      <HourlyForecastCards hourlyData={weatherData.hourly} />
    </section>
  );
};

export default ActualMeteoWithHourlyForecast;
