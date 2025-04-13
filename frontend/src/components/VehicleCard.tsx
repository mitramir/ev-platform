import { Vehicle } from "@/types/vehicle";
import { useState } from "react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : ["/placeholder.jpg"];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.jpg";
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative w-full h-48">
        <img
          src={images[currentImageIndex]}
          alt={`${vehicle.brand} ${vehicle.model} - Image ${
            currentImageIndex + 1
          }`}
          className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
          style={{ opacity: isTransitioning ? 0.5 : 1 }}
          onError={handleImageError}
          onTransitionEnd={handleTransitionEnd}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col h-36">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {vehicle.brand} {vehicle.model} ({vehicle.year})
        </h2>
        <p className="text-green-600 font-bold">
          ${vehicle.price.toLocaleString()}
        </p>
        <p className="text-gray-600">Range: {vehicle.range_km} km</p>
        <p className="text-gray-600">Condition: {vehicle.condition}</p>
        {vehicle.accidents && (
          <p className="text-red-500 truncate">
            Accident: {vehicle.accident_description || "Reported"}
          </p>
        )}
      </div>
    </div>
  );
}
