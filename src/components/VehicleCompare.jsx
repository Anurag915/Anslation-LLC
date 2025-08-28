import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VehicleCard from "./VehicleCard";
import CarIcon from "./CarIcon";

const VehicleCompare = () => {
  const [vehicle1, setVehicle1] = useState("");
  const [vehicle2, setVehicle2] = useState("");
  
  // State for autocomplete suggestions
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  const fetchSuggestions = useCallback(async (query, suggestionSetter) => {
    if (query.length < 2) {
      suggestionSetter([]);
      return;
    }
    try {
      const response = await axios.get("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars", {
        params: { model: query, limit: 5 },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
        },
      });
      const suggestionNames = response.data.map(car => `${car.make} ${car.model}`);
      suggestionSetter(suggestionNames);
    } catch (err) {
      console.error("Suggestion fetch error:", err);
      suggestionSetter([]);
    }
  }, [apiKey]);

  // Debounce effect for the first input
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(vehicle1, setSuggestions1);
    }, 500);

    return () => clearTimeout(handler);
  }, [vehicle1, fetchSuggestions]);

  // Debounce effect for the second input
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions(vehicle2, setSuggestions2);
    }, 500);

    return () => clearTimeout(handler);
  }, [vehicle2, fetchSuggestions]);


  const handleCompare = async () => {
    if (!vehicle1 || !vehicle2) {
      setError("Please select both vehicles to compare.");
      return;
    }
    setLoading(true);
    setData([]);
    setError("");

    const options = {
      method: "GET",
      url: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const [res1, res2] = await Promise.all([
        axios.request({ ...options, params: { model: vehicle1 } }),
        axios.request({ ...options, params: { model: vehicle2 } }),
      ]);

      const data1 = res1.data?.[0];
      const data2 = res2.data?.[0];

      if (data1 && data2) {
        setData([data1, data2]);
      } else {
        setError("Could not find data for one or both vehicles. Please use the suggestions to select a valid model.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching vehicle data. Please try again later.");
    }
    setLoading(false);
  };

  const handleSuggestionClick = (setter, suggestionSetter, value) => {
    setter(value);
    suggestionSetter([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Vehicle Comparator</h1>
        <p className="text-center text-gray-500 mb-6">Type a car name below and select from the suggestions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Vehicle 1 Input */}
          <div className="relative">
            <input
              className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="e.g., Toyota Camry"
              value={vehicle1}
              onChange={(e) => setVehicle1(e.target.value)}
              onBlur={() => setTimeout(() => setSuggestions1([]), 200)}
            />
            {suggestions1.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                {suggestions1.map((s, i) => (
                  <li key={i} onMouseDown={() => handleSuggestionClick(setVehicle1, setSuggestions1, s)} className="p-3 hover:bg-gray-100 cursor-pointer">{s}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Vehicle 2 Input */}
          <div className="relative">
            <input
              className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="e.g., Honda Accord"
              value={vehicle2}
              onChange={(e) => setVehicle2(e.target.value)}
              onBlur={() => setTimeout(() => setSuggestions2([]), 200)}
            />
            {suggestions2.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                {suggestions2.map((s, i) => (
                  <li key={i} onMouseDown={() => handleSuggestionClick(setVehicle2, setSuggestions2, s)} className="p-3 hover:bg-gray-100 cursor-pointer">{s}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleCompare}
            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
            disabled={loading}
          >
            {loading ? "Searching..." : "Compare Vehicles"}
          </button>
        </div>

        {/* --- Results Section --- */}
        <div className="mt-8">
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
          {error && !loading && <p className="text-center text-red-500 font-semibold bg-red-100 p-3 rounded-lg">{error}</p>}
          
          {data.length === 2 && !loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 animate-fade-in">
              <VehicleCard vehicle={data[0]} />
              <VehicleCard vehicle={data[1]} />
            </div>
          )}
          
          {!loading && !error && data.length === 0 && (
             <div className="text-center p-8 text-gray-500">
               <CarIcon className="mx-auto h-16 w-16 text-gray-400" />
               <p className="mt-4">Comparison data will appear here.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCompare;