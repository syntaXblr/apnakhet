import { FarmData, LocationCoordinates } from "../types";

export const fetchFarmDataForLocation = async (
  coordinates: LocationCoordinates,
  address: string
): Promise<FarmData> => {
  try {
    const response = await fetch("http://localhost:8000/api/farm-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates,
        address
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const data: FarmData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching farm data:", error);
    throw error;
  }
};
