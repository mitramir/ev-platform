"use client";

import { useState, useEffect, useCallback } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleForm } from "@/components/VehicleForm";
import {
  fetchVehicles,
  createVehicle,
  deleteVehicle,
} from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<keyof Vehicle | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showNotification, setShowNotification] = useState(false);

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVehicles();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch {
      setError("Failed to load vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  useEffect(() => {
    let filtered = [...vehicles];

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

    if (sortCriteria) {
      filtered.sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        if (sortCriteria === "location") {
          return sortOrder === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }

        return sortOrder === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      });
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, conditionFilter, vehicles, sortCriteria, sortOrder]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCreate = useCallback(async (vehicle: Omit<Vehicle, "id">) => {
    try {
      const newVehicle = await createVehicle(vehicle);
      setVehicles((prev) => [...prev, newVehicle]);
      setFilteredVehicles((prev) => [...prev, newVehicle]);
      setShowCreateForm(false);
      setShowNotification(true); // Show notification after successful creation
    } catch {
      setError("Failed to create vehicle.");
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteVehicle(id);
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        setFilteredVehicles((prev) => prev.filter((v) => v.id !== id));
      } catch {
        setError("Failed to delete vehicle.");
      }
    }
  }, []);

  const handleSort = useCallback(
    (criteria: keyof Vehicle) => {
      const newSortOrder =
        sortCriteria === criteria && sortOrder === "asc" ? "desc" : "asc";
      setSortCriteria(criteria);
      setSortOrder(newSortOrder);
    },
    [sortCriteria, sortOrder]
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setConditionFilter("All");
    setSortCriteria(null);
    setSortOrder("asc");
  }, []);

  const handleNotificationClose = (action: "addAnother" | "goToMain") => {
    setShowNotification(false);
    if (action === "addAnother") {
      setShowCreateForm(true);
    } else {
      // Already on main page, no action needed
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        EV Platform
      </h1>

      {showCreateForm ? (
        <div className="mb-8">
          <VehicleForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              aria-label="Add a new vehicle"
            >
              Add New Vehicle
            </button>
          </div>

          {/* Notification Modal */}
          {showNotification && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Vehicle Added Successfully!
                </h2>
                <p className="mb-4">What would you like to do next?</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleNotificationClose("addAnother")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Add another vehicle"
                  >
                    Add Another
                  </button>
                  <button
                    onClick={() => handleNotificationClose("goToMain")}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    aria-label="Go to main page"
                  >
                    Go to Main Page
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search, Filter, and Sort */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center p-4 rounded-lg bg-white shadow-md">
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 p-3 text-sm border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              aria-label="Search vehicles by brand or model"
            />
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="w-full sm:w-40 p-3 text-sm border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              aria-label="Filter vehicles by condition"
            >
              <option value="All">All Conditions</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("price")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                aria-label={`Sort vehicles by price (${
                  sortCriteria === "price" ? sortOrder : "asc"
                })`}
              >
                Sort by Price {sortCriteria === "price" && `(${sortOrder})`}
              </button>
              <button
                onClick={() => handleSort("range_km")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                aria-label={`Sort vehicles by range (${
                  sortCriteria === "range_km" ? sortOrder : "asc"
                })`}
              >
                Sort by Range {sortCriteria === "range_km" && `(${sortOrder})`}
              </button>
              <button
                onClick={() => handleSort("location")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                aria-label={`Sort vehicles by location (${
                  sortCriteria === "location" ? sortOrder : "asc"
                })`}
              >
                Sort by Location{" "}
                {sortCriteria === "location" && `(${sortOrder})`}
              </button>
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              aria-label="Clear all filters and sorting"
            >
              Clear Filters
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 focus:outline-none"
                aria-label="Dismiss error message"
              >
                ✕
              </button>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 text-lg mt-2">Loading vehicles...</p>
            </div>
          )}

          {/* Vehicle List */}
          {!loading && !error && filteredVehicles.length === 0 && (
            <p className="text-center text-gray-600 text-lg">
              No vehicles found.
            </p>
          )}
          {!loading && error && (
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={loadVehicles}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Retry loading vehicles"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && filteredVehicles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-screen-xl mx-auto p-4 rounded-lg">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="relative">
                  <VehicleCard
                    vehicle={vehicle}
                    onClick={() => router.push(`/vehicles/${vehicle.id}`)} // Ensure this is present
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                      aria-label={`Edit vehicle ${vehicle.brand} ${vehicle.model}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      aria-label={`Delete vehicle ${vehicle.brand} ${vehicle.model}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
