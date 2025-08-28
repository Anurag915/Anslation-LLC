import React from "react";

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;

  const specs = [
    { label: "Class", value: vehicle.class },
    { label: "Drive", value: vehicle.drive?.toUpperCase() },
    { label: "Transmission", value: vehicle.transmission === "a" ? "Automatic" : "Manual" },
    { label: "Cylinders", value: vehicle.cylinders },
    { label: "Fuel Type", value: vehicle.fuel_type },
    { label: "City MPG", value: vehicle.city_mpg },
    { label: "Highway MPG", value: vehicle.highway_mpg },
    { label: "Combined MPG", value: vehicle.combination_mpg },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 capitalize">
        {vehicle.make} {vehicle.model}
      </h2>
      <p className="text-lg text-gray-500 font-medium mb-4">{vehicle.year}</p>
      
      <div className="mt-4 space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
            <span className="text-gray-600 font-medium">{spec.label}</span>
            <span className="text-gray-900 font-semibold capitalize">{spec.value || 'N/A'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCard;