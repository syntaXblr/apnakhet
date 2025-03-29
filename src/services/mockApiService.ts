import { FarmData, LocationCoordinates } from "../types";

export const fetchFarmDataForLocation = async (
  coordinates: LocationCoordinates,
  address: string
): Promise<FarmData> => {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      address,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch farm data");
  }

  const data: FarmData = await response.json();
  return data;
};
