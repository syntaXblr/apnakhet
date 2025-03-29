from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from datetime import datetime
import httpx
import os

app = FastAPI()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "162870622ab53285676040a0607b4f11")

class Coordinates(BaseModel):
    latitude: float
    longitude: float

class FarmRequest(BaseModel):
    coordinates: Coordinates
    address: str

@app.post("/api/farm-data")
async def get_farm_data(payload: FarmRequest) -> Dict:
    lat = payload.coordinates.latitude
    lon = payload.coordinates.longitude

    # Call OpenWeather API
    async with httpx.AsyncClient() as client:
        weather_url = (
            f"https://api.openweathermap.org/data/2.5/weather?"
            f"lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        )
        weather_res = await client.get(weather_url)
        weather_json = weather_res.json()

    # Parse weather data
    weather_data = {
        "temperature": weather_json["main"]["temp"],
        "humidity": weather_json["main"]["humidity"],
        "rainfall": weather_json.get("rain", {}).get("1h", 0),
        "forecast": weather_json["weather"][0]["main"]
    }

    # Mock soil + crop logic (could replace with real APIs later)
    soil_type = "Alluvial"
    soil_data = {
        "type": soil_type,
        "moisture": 52,
        "ph": 6.8,
        "nutrients": {
            "nitrogen": 80,
            "phosphorus": 45,
            "potassium": 100
        }
    }

    cropRecommendations = [
        {"name": "Rice", "suitability": 88, "expectedYield": "30 quintals/hectare"},
        {"name": "Wheat", "suitability": 84, "expectedYield": "28 quintals/hectare"}
    ]

    return {
        "location": {
            "coordinates": {"latitude": lat, "longitude": lon},
            "address": payload.address
        },
        "weather": weather_data,
        "soil": soil_data,
        "cropRecommendations": cropRecommendations,
        "insights": {
            "irrigation": {
                "recommendation": "Increase irrigation frequency",
                "schedule": "4 days",
                "waterRequired": "35 mm"
            },
            "fertilizer": {
                "recommendation": "Apply balanced NPK fertilizer",
                "timing": "10 days",
                "amount": "160 kg/hectare"
            },
            "pesticide": {
                "recommendation": "Monitor for aphids",
                "targetPests": ["Aphids", "Stem Borers"],
                "application": "Foliar spray at 1.5%"
            }
        },
        "lastUpdated": datetime.utcnow().isoformat()
    }
