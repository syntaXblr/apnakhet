
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface FarmLocation {
  coordinates: LocationCoordinates;
  address: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
}

export interface SoilData {
  type: string;
  moisture: number;
  ph: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

export interface CropRecommendation {
  name: string;
  suitability: number;
  expectedYield: string;
}

export interface FarmInsight {
  irrigation: {
    recommendation: string;
    schedule: string;
    waterRequired: string;
  };
  fertilizer: {
    recommendation: string;
    timing: string;
    amount: string;
  };
  pesticide: {
    recommendation: string;
    targetPests: string[];
    application: string;
  };
}

export interface FarmData {
  id?: string;
  location: FarmLocation;
  weather: WeatherData;
  soil: SoilData;
  cropRecommendations: CropRecommendation[];
  insights: FarmInsight;
  lastUpdated: string;
}
