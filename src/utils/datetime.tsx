function GetDayTime(day) {
    console.log(day)
  const date = new Date(day* 1000).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  return date
}

export default GetDayTime;
