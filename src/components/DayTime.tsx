import { useWeatherStore } from "../store";
import GetDayTime from "../utils/datetime";

function DayTime() {
  const { weatherData } = useWeatherStore();
  const day = weatherData?.current?.dt;

  const CurrentDate = GetDayTime(day);

  return (
    <>
      <div className="currentDate">
        <p>{CurrentDate}</p>
      </div>
    </>
  );
}

export default DayTime;
