import { useState, useEffect } from "react";
import { FiMapPin, FiChevronDown } from "react-icons/fi";
import { useWeatherStore } from "../store";

type Suggestion = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  displayName: string;
};

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
function LocationButton() {
  const { city, setCity } = useWeatherStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      const formattedSuggestions: Suggestion[] = data.map((item: any) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
        displayName: `${item.name}${item.state ? `, ${item.state}` : ""}, ${
          item.country
        }`,
      }));
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error("Error buscando ciudades:", error);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchCities(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleCitySelect = (suggestion: Suggestion) => {
    setCity(suggestion.name);
    setSearchText("");
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full pt-4 z-[100]">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-2 w-full justify-center rounded transition-colors bg-transparent border-white/30 border-2"
      >
        <FiMapPin size={20} className="text-white" />
        <span className="ciudad text-white">{city}</span>
        <FiChevronDown
          size={16}
          className={`transition-transform text-white ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Contenido del dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded mt-1 z-[100]">
          <div className="p-2">
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 bg-transparent backdrop-blur-md rounded text-black placeholder-black/50 border border-black/20"
              autoFocus
            />

            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleCitySelect(suggestion)}
                className="w-full text-left p-2 hover:bg-white/20 rounded transition-colors text-sm"
              >
                <div className="font-medium">{suggestion.name}</div>
                <div className="text-xs opacity-70">
                  {suggestion.state && `${suggestion.state}, `}
                  {suggestion.country}
                </div>
              </button>
            ))}

            {/* No results */}
            {searchText.length >= 2 &&
              !isLoading &&
              suggestions.length === 0 && (
                <div className="p-2 text-sm opacity-70">
                  No se encontraron ciudades
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationButton;
