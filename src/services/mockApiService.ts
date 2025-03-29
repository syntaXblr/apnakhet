const API_URL = import.meta.env.VITE_API_URL;

export const fetchFarmDataForLocation = async (
  coordinates: LocationCoordinates,
  address: string
): Promise<FarmData> => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latitude: coordinates.latitude, longitude: coordinates.longitude, address }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch farm data");
  }

  return await response.json();
};
