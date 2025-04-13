"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  fetchVehicleById,
  updateVehicle,
  deleteVehicle,
} from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";
import { VehicleForm } from "@/components/VehicleForm";

export default function VehicleDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      setError(null);
      try {
        if (typeof id === "string") {
          const data = await fetchVehicleById(id);
          setVehicle(data);
        }
      } catch {
        setError("Failed to load vehicle.");
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [id]);

  const handleUpdate = useCallback(
    async (updatedVehicle: Omit<Vehicle, "id">) => {
      try {
        if (typeof id === "string") {
          const result = await updateVehicle(
            id,
            updatedVehicle as Partial<Vehicle>
          );
          setVehicle(result);
          setIsEditing(false);
        }
      } catch {
        setError("Failed to update vehicle.");
      }
    },
    [id]
  );

  const handleDelete = useCallback(async () => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        if (typeof id === "string") {
          await deleteVehicle(id);
          router.push("/");
        }
      } catch {
        setError("Failed to delete vehicle.");
      }
    }
  }, [id, router]);

  const handleNextImage = () => {
    if (
      vehicle &&
      vehicle.images &&
      vehicle.images.length > 0 &&
      !isTransitioning
    ) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const handlePrevImage = () => {
    if (
      vehicle &&
      vehicle.images &&
      vehicle.images.length > 0 &&
      !isTransitioning
    ) {
      setIsTransitioning(true);
      setCurrentImageIndex(
        (prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length
      );
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.jpg";
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false); // Reset transitioning state after animation
  };

  if (loading)
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600 text-lg mt-2">Loading...</p>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!vehicle)
    return <p className="text-center text-gray-600">Vehicle not found.</p>;

  const images =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : ["/placeholder.jpg"];

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      {isEditing ? (
        <VehicleForm
          initialVehicle={vehicle}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">
            {vehicle.brand} {vehicle.model} ({vehicle.year})
          </h1>
          <div className="relative w-full h-64 mb-4">
            <img
              src={images[currentImageIndex]}
              alt={`${vehicle.brand} ${vehicle.model} - Image ${
                currentImageIndex + 1
              }`}
              className="w-full h-full object-cover rounded-md transition-opacity duration-300 ease-in-out"
              style={{ opacity: isTransitioning ? 0.5 : 1 }} // Fade effect during transition
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
          <p className="text-lg font-bold text-green-600 mb-2">
            ${vehicle.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-2">Range: {vehicle.range_km} km</p>
          <p className="text-gray-600 mb-2">Condition: {vehicle.condition}</p>
          <p className="text-gray-600 mb-2">Location: {vehicle.location}</p>
          <p className="text-gray-600 mb-2">
            Battery Capacity: {vehicle.battery_capacity_kWh} kWh
          </p>
          <p className="text-gray-600 mb-2">
            Charging Speed: {vehicle.charging_speed_kW} kW
          </p>
          <p className="text-gray-600 mb-2">Seats: {vehicle.seats}</p>
          <p className="text-gray-600 mb-2">Drivetrain: {vehicle.drivetrain}</p>
          <p className="text-gray-600 mb-2">
            Kilometer Count: {vehicle.kilometer_count} km
          </p>
          <p className="text-gray-600 mb-2">Color: {vehicle.color}</p>
          <p className="text-gray-600 mb-2">
            Autopilot: {vehicle.autopilot ? "Yes" : "No"}
          </p>
          {vehicle.accidents && (
            <p className="text-red-500 mb-2">
              Accident: {vehicle.accident_description || "Reported"}
            </p>
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Edit vehicle"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Delete vehicle"
            >
              Delete
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Back to vehicle list"
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
