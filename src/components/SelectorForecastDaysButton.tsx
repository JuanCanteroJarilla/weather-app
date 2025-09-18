import React, { useState } from "react";

interface SelectorForecastDaysButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

const SelectorForecastDaysButton: React.FC<SelectorForecastDaysButtonProps> = ({
  value,
  label,
  isSelected,
  onClick,
}) => (
  <button
    type="button"
    className={`px-4 py-2 rounded-lg transition-all duration-300 text-black font-medium backdrop-blur-sm border border-white/30 ${
      isSelected ? "bg-black/20" : "hover:bg-black/10 active:bg-black/20"
    }`}
    onClick={() => onClick(value)}
  >
    {label}
  </button>
);

function SelectorForecastDays() {
  const [selectedPeriod, setSelectedPeriod] = useState("5");
  interface HandlePeriodSelect {
    (period: string): void;
  }

  const handlePeriodSelect: HandlePeriodSelect = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="flex flex-row gap-4">
      <SelectorForecastDaysButton
        value="5"
        label="5 days"
        isSelected={selectedPeriod === "5"}
        onClick={handlePeriodSelect}
      />
      <SelectorForecastDaysButton
        value="15"
        label="15 days"
        isSelected={selectedPeriod === "15"}
        onClick={handlePeriodSelect}
      />
      <SelectorForecastDaysButton
        value="30"
        label="30 days"
        isSelected={selectedPeriod === "30"}
        onClick={handlePeriodSelect}
      />
    </div>
  );
}

export default SelectorForecastDays;
