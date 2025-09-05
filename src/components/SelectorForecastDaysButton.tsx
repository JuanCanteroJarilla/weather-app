import { useState } from "react";

function SelectorForecastDaysButton() {
  const [selectedPeriod, setSelectedPeriod] = useState("5");
  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <>
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
    </>
  );
}

export default SelectorForecastDaysButton;
