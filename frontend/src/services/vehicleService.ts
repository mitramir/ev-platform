import { Vehicle } from "@/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/vehicles";

export async function fetchVehicles(): Promise<Vehicle[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    throw error;
  }
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  try {
    const url = `${API_URL}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch vehicle with ID ${id}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Fetch vehicle by ID error:", error);
    throw error;
  }
}

export async function createVehicle(
  vehicle: Omit<Vehicle, "id">
): Promise<Vehicle> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create vehicle: ${response.statusText} - ${errorText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Create vehicle error:", error);
    throw error;
  }
}

export async function updateVehicle(
  id: string,
  vehicle: Partial<Vehicle>
): Promise<Vehicle> {
  try {
    const url = `${API_URL}/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update vehicle with ID ${id}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Update vehicle error:", error);
    throw error;
  }
}

export async function deleteVehicle(id: string): Promise<void> {
  try {
    const url = `${API_URL}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete vehicle with ID ${id}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Delete vehicle error:", error);
    throw error;
  }
}
