import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={vehicle.images[0] || "/placeholder.jpg"}
        alt={`${vehicle.brand} ${vehicle.model}`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">
        {vehicle.brand} {vehicle.model} ({vehicle.year})
      </h2>
      <p className="text-lg font-bold text-green-600">
        ${vehicle.price.toLocaleString()}
      </p>
      <p className="text-gray-600">Range: {vehicle.range_km} km</p>
      <p className="text-gray-600">Condition: {vehicle.condition}</p>
      <p className="text-gray-600">Location: {vehicle.location}</p>
      {vehicle.accidents && (
        <p className="text-red-500 text-sm">
          Accident: {vehicle.accident_description || "Reported"}
        </p>
      )}
    </div>
  );
}
