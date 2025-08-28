import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleSelector = ({ onVehicleSelect, apiKey }) => {
  // State for makes, models, and user selections
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);

  // 1. Fetch all car makes when the component first loads
  useEffect(() => {
    const fetchMakes = async () => {
      setLoadingMakes(true);
      try {
        const response = await axios.get('https://cars-by-api-ninjas.p.rapidapi.com/v1/carmakes', {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
          },
        });
        setMakes(response.data);
      } catch (error) {
        console.error('Failed to fetch car makes:', error);
        // This is likely to fail on a free plan
      }
      setLoadingMakes(false);
    };

    fetchMakes();
  }, [apiKey]);

  // 2. Fetch models for a make whenever a make is selected
  useEffect(() => {
    if (!selectedMake) {
      setModels([]);
      setSelectedModel('');
      return;
    }

    const fetchModels = async () => {
      setLoadingModels(true);
      setSelectedModel(''); // Reset model selection
      try {
        const response = await axios.get('https://cars-by-api-ninjas.p.rapidapi.com/v1/carmodels', {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
          },
          params: { make: selectedMake },
        });
        setModels(response.data);
      } catch (error) {
        console.error('Failed to fetch car models:', error);
      }
      setLoadingModels(false);
    };

    fetchModels();
  }, [selectedMake, apiKey]);

  // 3. When a model is selected, notify the parent component
  useEffect(() => {
    if (selectedMake && selectedModel) {
      onVehicleSelect(`${selectedMake} ${selectedModel}`);
    } else {
      onVehicleSelect(''); // Clear selection if not complete
    }
  }, [selectedMake, selectedModel, onVehicleSelect]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Make Dropdown */}
      <select
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
        disabled={loadingMakes}
        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      >
        <option value="">{loadingMakes ? 'Loading Makes...' : 'Select a Make'}</option>
        {makes.map((make) => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>

      {/* Model Dropdown */}
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        disabled={!selectedMake || loadingModels}
        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      >
        <option value="">{loadingModels ? 'Loading Models...' : 'Select a Model'}</option>
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
    </div>
  );
};

export default VehicleSelector;