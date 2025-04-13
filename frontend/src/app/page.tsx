"use client";

import { useState, useEffect } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { fetchVehicles } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All");

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
        setFilteredVehicles(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  useEffect(() => {
    let filtered = vehicles;
    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (conditionFilter !== "All") {
      filtered = filtered.filter((v) => v.condition === conditionFilter);
    }
    setFilteredVehicles(filtered);
  }, [searchTerm, conditionFilter, vehicles]);

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        EV Platform
      </h1>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="w-full sm:w-40 p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="All">All Conditions</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {/* Vehicle List */}
      {loading && (
        <p className="text-center text-gray-600">Loading vehicles...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && filteredVehicles.length === 0 && (
        <p className="text-center text-gray-600">No vehicles found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </main>
  );
}
