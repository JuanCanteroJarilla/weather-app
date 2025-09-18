import { useWeatherStore } from "../store";
import GetDayTime from "../utils/datetime";

const DayTime = () => {
  const { weatherData } = useWeatherStore();
  const timestamp = weatherData?.current?.dt;

  if (!timestamp) return null;

  const currentDate = GetDayTime(timestamp);

  return (
    <div className="currentDate">
      <p>{currentDate}</p>
    </div>
  );
};

export default DayTime;
