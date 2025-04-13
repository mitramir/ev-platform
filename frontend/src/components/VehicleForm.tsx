"use client";

import { useState, useCallback } from "react";
import { Vehicle } from "@/types/vehicle";

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  onSubmit: (vehicle: Omit<Vehicle, "id">) => void;
  onCancel: () => void;
}

export function VehicleForm({
  initialVehicle,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const [formData, setFormData] = useState<Omit<Vehicle, "id">>({
    brand: initialVehicle?.brand || "",
    model: initialVehicle?.model || "",
    year: initialVehicle?.year || new Date().getFullYear(),
    price: initialVehicle?.price || 0,
    range_km: initialVehicle?.range_km || 0,
    color: initialVehicle?.color || "",
    condition: initialVehicle?.condition || "New",
    battery_capacity_kWh: initialVehicle?.battery_capacity_kWh || 0,
    charging_speed_kW: initialVehicle?.charging_speed_kW || 0,
    seats: initialVehicle?.seats || 0,
    drivetrain: initialVehicle?.drivetrain || "FWD",
    location: initialVehicle?.location || "",
    autopilot: initialVehicle?.autopilot || false,
    kilometer_count: initialVehicle?.kilometer_count || 0,
    accidents: initialVehicle?.accidents || false,
    accident_description: initialVehicle?.accident_description || "",
    images: initialVehicle?.images || [""],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof Omit<Vehicle, "id">, string>>
  >({});

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof Omit<Vehicle, "id">, string>> = {};

    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (formData.year < 1886 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = `Year must be between 1886 and ${
        new Date().getFullYear() + 1
      }`;
    }
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.range_km <= 0)
      newErrors.range_km = "Range must be greater than 0";
    if (!formData.color) newErrors.color = "Color is required";
    if (formData.battery_capacity_kWh <= 0) {
      newErrors.battery_capacity_kWh =
        "Battery capacity must be greater than 0";
    }
    if (formData.charging_speed_kW <= 0) {
      newErrors.charging_speed_kW = "Charging speed must be greater than 0";
    }
    if (formData.seats <= 0) newErrors.seats = "Seats must be greater than 0";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.kilometer_count < 0) {
      newErrors.kilometer_count = "Kilometer count cannot be negative";
    }
    if (formData.accidents && !formData.accident_description) {
      newErrors.accident_description =
        "Accident description is required if accidents are reported";
    }
    if (formData.images.length === 0 || formData.images.every((img) => !img)) {
      newErrors.images = "At least one image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    console.log("Form validation result:", isValid, "Errors:", errors);
    if (isValid) {
      console.log("Submitting data:", formData);
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = value === "" ? 0 : parseFloat(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages.length > 0 ? newImages : [""],
    }));
  };

  // Prevent scrolling from changing number input values
  const preventScrollChange = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialVehicle ? "Edit Vehicle" : "Add New Vehicle"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.brand}
            aria-describedby={errors.brand ? "brand-error" : undefined}
          />
          {errors.brand && (
            <p id="brand-error" className="text-red-500 text-sm mt-1">
              {errors.brand}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.model}
            aria-describedby={errors.model ? "model-error" : undefined}
          />
          {errors.model && (
            <p id="model-error" className="text-red-500 text-sm mt-1">
              {errors.model}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year === 0 ? "" : formData.year}
            placeholder="e.g., 2023"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.year}
            aria-describedby={errors.year ? "year-error" : undefined}
          />
          {errors.year && (
            <p id="year-error" className="text-red-500 text-sm mt-1">
              {errors.year}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price === 0 ? "" : formData.price}
            placeholder="e.g., 35000"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? "price-error" : undefined}
          />
          {errors.price && (
            <p id="price-error" className="text-red-500 text-sm mt-1">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="range_km"
            className="block text-sm font-medium text-gray-700"
          >
            Range (km)
          </label>
          <input
            type="number"
            id="range_km"
            name="range_km"
            value={formData.range_km === 0 ? "" : formData.range_km}
            placeholder="e.g., 400"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.range_km}
            aria-describedby={errors.range_km ? "range_km-error" : undefined}
          />
          {errors.range_km && (
            <p id="range_km-error" className="text-red-500 text-sm mt-1">
              {errors.range_km}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.color}
            aria-describedby={errors.color ? "color-error" : undefined}
          />
          {errors.color && (
            <p id="color-error" className="text-red-500 text-sm mt-1">
              {errors.color}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700"
          >
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="battery_capacity_kWh"
            className="block text-sm font-medium text-gray-700"
          >
            Battery Capacity (kWh)
          </label>
          <input
            type="number"
            id="battery_capacity_kWh"
            name="battery_capacity_kWh"
            value={
              formData.battery_capacity_kWh === 0
                ? ""
                : formData.battery_capacity_kWh
            }
            placeholder="e.g., 75"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.battery_capacity_kWh}
            aria-describedby={
              errors.battery_capacity_kWh
                ? "battery_capacity_kWh-error"
                : undefined
            }
          />
          {errors.battery_capacity_kWh && (
            <p
              id="battery_capacity_kWh-error"
              className="text-red-500 text-sm mt-1"
            >
              {errors.battery_capacity_kWh}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="charging_speed_kW"
            className="block text-sm font-medium text-gray-700"
          >
            Charging Speed (kW)
          </label>
          <input
            type="number"
            id="charging_speed_kW"
            name="charging_speed_kW"
            value={
              formData.charging_speed_kW === 0 ? "" : formData.charging_speed_kW
            }
            placeholder="e.g., 150"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.charging_speed_kW}
            aria-describedby={
              errors.charging_speed_kW ? "charging_speed_kW-error" : undefined
            }
          />
          {errors.charging_speed_kW && (
            <p
              id="charging_speed_kW-error"
              className="text-red-500 text-sm mt-1"
            >
              {errors.charging_speed_kW}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="seats"
            className="block text-sm font-medium text-gray-700"
          >
            Seats
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats === 0 ? "" : formData.seats}
            placeholder="e.g., 5"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.seats}
            aria-describedby={errors.seats ? "seats-error" : undefined}
          />
          {errors.seats && (
            <p id="seats-error" className="text-red-500 text-sm mt-1">
              {errors.seats}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="drivetrain"
            className="block text-sm font-medium text-gray-700"
          >
            Drivetrain
          </label>
          <select
            id="drivetrain"
            name="drivetrain"
            value={formData.drivetrain}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          {errors.location && (
            <p id="location-error" className="text-red-500 text-sm mt-1">
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="kilometer_count"
            className="block text-sm font-medium text-gray-700"
          >
            Kilometer Count
          </label>
          <input
            type="number"
            id="kilometer_count"
            name="kilometer_count"
            value={
              formData.kilometer_count === 0 ? "" : formData.kilometer_count
            }
            placeholder="e.g., 50000"
            onChange={handleChange}
            onWheel={preventScrollChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-invalid={!!errors.kilometer_count}
            aria-describedby={
              errors.kilometer_count ? "kilometer_count-error" : undefined
            }
          />
          {errors.kilometer_count && (
            <p id="kilometer_count-error" className="text-red-500 text-sm mt-1">
              {errors.kilometer_count}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="autopilot"
          name="autopilot"
          checked={formData.autopilot}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="autopilot"
          className="text-sm font-medium text-gray-700"
        >
          Autopilot
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="accidents"
          name="accidents"
          checked={formData.accidents}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="accidents"
          className="text-sm font-medium text-gray-700"
        >
          Accidents Reported
        </label>
      </div>

      {formData.accidents && (
        <div>
          <label
            htmlFor="accident_description"
            className="block text-sm font-medium text-gray-700"
          >
            Accident Description
          </label>
          <textarea
            id="accident_description"
            name="accident_description"
            value={formData.accident_description}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            aria-invalid={!!errors.accident_description}
            aria-describedby={
              errors.accident_description
                ? "accident_description-error"
                : undefined
            }
          />
          {errors.accident_description && (
            <p
              id="accident_description-error"
              className="text-red-500 text-sm mt-1"
            >
              {errors.accident_description}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => removeImageField(index)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={formData.images.length === 1}
              aria-label={`Remove image ${index + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images}</p>
        )}
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Add another image URL"
        >
          Add Image
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={initialVehicle ? "Update vehicle" : "Create vehicle"}
        >
          {initialVehicle ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
