"use client";

import { useState, useEffect } from "react";
import { fetchVehicleById } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function VehicleDetail() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    async function loadVehicle() {
      try {
        const data = await fetchVehicleById(id);
        setVehicle(data);
      } catch (error) {
        setError("Failed to load vehicle details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadVehicle();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600 p-4">Loading vehicle...</p>;
  }

  if (error || !vehicle) {
    return (
      <p className="text-center text-red-500 p-4">
        {error || "Vehicle not found."}
      </p>
    );
  }

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-100">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-500 hover:underline"
      >
        &larr; Back to Vehicle List
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {vehicle.brand} {vehicle.model} ({vehicle.year})
        </h1>
        <img
          src={vehicle.images[0] || "/placeholder.jpg"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full max-w-md h-auto rounded-md mb-6 mx-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-700">
              Price:{" "}
              <span className="text-green-600">
                ${vehicle.price.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-600">Range: {vehicle.range_km} km</p>
            <p className="text-gray-600">Condition: {vehicle.condition}</p>
            <p className="text-gray-600">Location: {vehicle.location}</p>
            <p className="text-gray-600">
              Battery Capacity: {vehicle.battery_capacity_kWh} kWh
            </p>
            <p className="text-gray-600">
              Charging Speed: {vehicle.charging_speed_kW} kW
            </p>
          </div>
          <div>
            <p className="text-gray-600">Seats: {vehicle.seats}</p>
            <p className="text-gray-600">Drivetrain: {vehicle.drivetrain}</p>
            <p className="text-gray-600">
              Autopilot: {vehicle.autopilot ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              Kilometers: {vehicle.kilometer_count.toLocaleString()}
            </p>
            {vehicle.accidents && (
              <p className="text-red-500">
                Accident: {vehicle.accident_description || "Reported"}
              </p>
            )}
          </div>
        </div>
        {vehicle.images.length > 1 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Additional Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {vehicle.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 2}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
