from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import ee

# Initialize Google Earth Engine
ee.Initialize()

app = FastAPI()

class Coordinates(BaseModel):
    latitude: float
    longitude: float
    address: str

@app.post("/analyze")
async def analyze_farm_data(coord: Coordinates):
    lat, lon = coord.latitude, coord.longitude
    point = ee.Geometry.Point(lon, lat)

    # Sentinel-2 NDVI (past month)
    image = (ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(point)
        .filterDate("2024-03-01", "2024-03-30")
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
        .median())

    ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
    ndvi_value = ndvi.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=point,
        scale=10
    ).get("NDVI").getInfo()

    ndvi_value = float(ndvi_value or 0.4)
    soil_moisture = round(20 + 60 * ndvi_value, 2)  # Simple estimate

    if ndvi_value > 0.6:
        crop_type = "Dense vegetation - Likely Paddy or Sugarcane"
    elif ndvi_value > 0.4:
        crop_type = "Moderate vegetation - Possibly Wheat or Pulses"
    else:
        crop_type = "Sparse vegetation - Possibly Millets or Fallow"

    return {
        "location": {
            "coordinates": {"latitude": lat, "longitude": lon},
            "address": coord.address
        },
        "weather": {
            "temperature": 29.5,  # Placeholder
            "humidity": 65,
            "rainfall": 80,
            "forecast": "Partly Cloudy"
        },
        "soil": {
            "type": "NDVI-derived",
            "moisture": soil_moisture,
            "ph": 6.8,
            "nutrients": {
                "nitrogen": 85,
                "phosphorus": 45,
                "potassium": 95
            }
        },
        "cropRecommendations": [
            {
                "name": crop_type,
                "suitability": 88,
                "expectedYield": "32 quintals/hectare"
            }
        ],
        "insights": {
            "irrigation": {
                "recommendation": "Moderate irrigation needed",
                "schedule": "3 days",
                "waterRequired": "35 mm"
            },
            "fertilizer": {
                "recommendation": "Apply balanced NPK",
                "timing": "10 days",
                "amount": "150 kg/hectare"
            },
            "pesticide": {
                "recommendation": "No major pests detected",
                "targetPests": ["Aphids", "Thrips"],
                "application": "Foliar spray at 1.5%"
            }
        },
        "lastUpdated": datetime.utcnow().isoformat()
    }
