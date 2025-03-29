
import { FarmData, LocationCoordinates } from "../types";

// This simulates what would normally come from a Python backend
export const fetchFarmDataForLocation = async (
  coordinates: LocationCoordinates,
  address: string
): Promise<FarmData> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Generate pseudo-random data based on coordinates to simulate
  // different data for different locations
  const latSeed = coordinates.latitude * 10;
  const longSeed = coordinates.longitude * 10;
  const randomSeed = (latSeed + longSeed) % 100;
  
  // Deterministic "random" generation based on location
  const randomInRange = (min: number, max: number, seed: number) => {
    const factor = ((seed * 9301 + 49297) % 233280) / 233280;
    return min + factor * (max - min);
  };
  
  const generateRandomFromArr = (arr: string[], seed: number) => {
    const index = Math.floor(randomInRange(0, arr.length, seed));
    return arr[index];
  };

  // Soil types based on regions in India
  const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Saline", "Peaty", "Forest"];
  const selectedSoilType = generateRandomFromArr(soilTypes, randomSeed);
  
  // Crop recommendations based on soil type
  const cropsByRegion: Record<string, string[]> = {
    "Alluvial": ["Rice", "Wheat", "Sugarcane", "Maize"],
    "Black": ["Cotton", "Soybean", "Pigeon Pea", "Sugarcane"],
    "Red": ["Groundnut", "Millet", "Tobacco", "Pulses"],
    "Laterite": ["Tea", "Coffee", "Rubber", "Coconut"],
    "Arid": ["Millet", "Barley", "Chickpea", "Mustard"],
    "Saline": ["Salt-resistant Rice", "Barley", "Date Palm", "Cotton"],
    "Peaty": ["Rice", "Jute", "Sugarcane", "Vegetables"],
    "Forest": ["Spices", "Fruits", "Medicinal Plants", "Vegetables"]
  };
  
  const recommendedCrops = cropsByRegion[selectedSoilType] || cropsByRegion["Alluvial"];
  
  // Weather conditions
  const weather = {
    temperature: randomInRange(20, 35, randomSeed + 1),
    humidity: randomInRange(40, 90, randomSeed + 2),
    rainfall: randomInRange(10, 200, randomSeed + 3),
    forecast: generateRandomFromArr(["Sunny", "Partly Cloudy", "Overcast", "Light Rain", "Heavy Rain"], randomSeed + 4)
  };
  
  // Soil data
  const soil = {
    type: selectedSoilType,
    moisture: randomInRange(30, 80, randomSeed + 5),
    ph: randomInRange(5.5, 8.5, randomSeed + 6),
    nutrients: {
      nitrogen: randomInRange(20, 120, randomSeed + 7),
      phosphorus: randomInRange(10, 80, randomSeed + 8),
      potassium: randomInRange(30, 150, randomSeed + 9)
    }
  };
  
  // Generate crop recommendations
  const cropRecommendations = recommendedCrops.map((crop, index) => ({
    name: crop,
    suitability: randomInRange(60, 95, randomSeed + 10 + index),
    expectedYield: `${Math.round(randomInRange(15, 40, randomSeed + 20 + index) * 100) / 100} quintals/hectare`
  }));
  
  // Generate insights based on data
  let irrigationRec = "No additional irrigation needed";
  let fertilizerRec = "Apply balanced NPK fertilizer";
  let pesticideRec = "No immediate pest concerns";
  
  if (soil.moisture < 50) {
    irrigationRec = "Increase irrigation frequency";
  }
  
  if (soil.nutrients.nitrogen < 60) {
    fertilizerRec = "Apply nitrogen-rich fertilizer";
  } else if (soil.nutrients.phosphorus < 40) {
    fertilizerRec = "Apply phosphorus-rich fertilizer";
  } else if (soil.nutrients.potassium < 70) {
    fertilizerRec = "Apply potassium-rich fertilizer";
  }
  
  const commonPests = ["Aphids", "Whiteflies", "Thrips", "Bollworms", "Stem Borers"];
  const targetPests = [
    generateRandomFromArr(commonPests, randomSeed + 30),
    generateRandomFromArr(commonPests, randomSeed + 31)
  ];
  
  return {
    location: {
      coordinates,
      address
    },
    weather,
    soil,
    cropRecommendations,
    insights: {
      irrigation: {
        recommendation: irrigationRec,
        schedule: `${Math.round(randomInRange(2, 7, randomSeed + 40))} days`,
        waterRequired: `${Math.round(randomInRange(20, 50, randomSeed + 41))} mm`
      },
      fertilizer: {
        recommendation: fertilizerRec,
        timing: `${Math.round(randomInRange(7, 21, randomSeed + 50))} days`,
        amount: `${Math.round(randomInRange(100, 250, randomSeed + 51))} kg/hectare`
      },
      pesticide: {
        recommendation: pesticideRec,
        targetPests,
        application: `${generateRandomFromArr(["Foliar spray", "Soil application", "Seed treatment"], randomSeed + 60)} at ${Math.round(randomInRange(0.5, 2.5, randomSeed + 61) * 10) / 10}%`
      }
    },
    lastUpdated: new Date().toISOString()
  };
};
