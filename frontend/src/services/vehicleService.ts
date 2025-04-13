import { Vehicle } from "@/types/vehicle";

export async function fetchVehicles(): Promise<Vehicle[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log("Fetching vehicles from:", API_URL);
  const response = await fetch(`${API_URL}/vehicles`, {
    cache: "no-store",
  });
  console.log("Response status:", response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }
  const data = await response.json();
  console.log("Fetched data:", data);
  return data;
}
