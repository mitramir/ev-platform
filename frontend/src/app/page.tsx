"use client";

import { useState, useEffect } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { fetchVehicles } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to load vehicles. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">EV Platform</h1>
      {loading && <p className="text-center">Loading vehicles...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && vehicles.length === 0 && (
        <p className="text-center">No vehicles available.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </main>
  );
}
