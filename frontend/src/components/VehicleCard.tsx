import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block">
      <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <img
          src={vehicle.images[0] || "/placeholder.jpg"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">
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
    </Link>
  );
}
