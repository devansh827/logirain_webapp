from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import numpy as np
from typing import Optional
import os

app = FastAPI(title="Australia Weather Prediction API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model (you'll need to place your .pkl file here)
MODEL_PATH = "model/weather_model.pkl"

class WeatherInput(BaseModel):
    location: str
    min_temp: float
    max_temp: float
    rainfall: float
    evaporation: Optional[float] = None
    sunshine: Optional[float] = None
    wind_gust_speed: Optional[float] = None
    wind_speed_9am: Optional[float] = None
    wind_speed_3pm: Optional[float] = None
    humidity_9am: Optional[float] = None
    humidity_3pm: Optional[float] = None
    pressure_9am: Optional[float] = None
    pressure_3pm: Optional[float] = None
    cloud_9am: Optional[float] = None
    cloud_3pm: Optional[float] = None
    temp_9am: Optional[float] = None
    temp_3pm: Optional[float] = None
    rain_today: str  # "Yes" or "No"

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    confidence: str

# Exact locations from your CSV data
LOCATIONS = [
    'Albury', 'BadgerysCreek', 'Cobar', 'CoffsHarbour', 'Moree',
    'Newcastle', 'NorahHead', 'NorfolkIsland', 'Penrith', 'Richmond',
    'Sydney', 'SydneyAirport', 'WaggaWagga', 'Williamtown',
    'Wollongong', 'Canberra', 'Tuggeranong', 'MountGinini', 'Ballarat',
    'Bendigo', 'Sale', 'MelbourneAirport', 'Melbourne', 'Mildura',
    'Nhil', 'Portland', 'Watsonia', 'Dartmoor', 'Brisbane', 'Cairns',
    'GoldCoast', 'Townsville', 'Adelaide', 'MountGambier', 'Nuriootpa',
    'Woomera', 'Albany', 'Witchcliffe', 'PearceRAAF', 'PerthAirport',
    'Perth', 'SalmonGums', 'Walpole', 'Hobart', 'Launceston',
    'AliceSprings', 'Darwin', 'Katherine', 'Uluru'
]

# Load unique locations from CSV
def get_locations():
    try:
        df = pd.read_csv("data/weatherAUS - dev.csv")
        return sorted(df['Location'].unique().tolist())
    except Exception as e:
        # Fallback to hardcoded list if CSV is not available
        return LOCATIONS

@app.get("/")
async def root():
    return {"message": "Australia Weather Prediction API"}

@app.get("/locations")
async def get_available_locations():
    """Get all available locations for weather prediction"""
    return {"locations": get_locations()}

@app.get("/weather-stats/{location}")
async def get_weather_stats(location: str):
    """Get weather statistics for a specific location"""
    try:
        df = pd.read_csv("data/weatherAUS - dev.csv")
        location_data = df[df['Location'] == location]
        
        if location_data.empty:
            raise HTTPException(status_code=404, detail="Location not found")
        
        stats = {
            "avg_min_temp": round(location_data['MinTemp'].mean(), 1),
            "avg_max_temp": round(location_data['MaxTemp'].mean(), 1),
            "avg_rainfall": round(location_data['Rainfall'].mean(), 1),
            "avg_humidity_9am": round(location_data['Humidity9am'].mean(), 1),
            "avg_humidity_3pm": round(location_data['Humidity3pm'].mean(), 1),
            "rain_days_percentage": round((location_data['RainTomorrow'] == 'Yes').mean() * 100, 1)
        }
        
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict", response_model=PredictionResponse)
async def predict_rain(weather_data: WeatherInput):
    """Predict if it will rain tomorrow based on weather parameters"""
    try:
        # For demo purposes, we'll create a simple prediction logic
        # In production, you would load your actual trained model here
        
        # Simple logic based on weather patterns
        rain_probability = 0.0
        
        # Factors that increase rain probability
        if weather_data.rainfall > 0:
            rain_probability += 0.3
        if weather_data.humidity_9am and weather_data.humidity_9am > 70:
            rain_probability += 0.2
        if weather_data.humidity_3pm and weather_data.humidity_3pm > 60:
            rain_probability += 0.2
        if weather_data.rain_today == "Yes":
            rain_probability += 0.25
        if weather_data.cloud_9am and weather_data.cloud_9am > 6:
            rain_probability += 0.15
        if weather_data.cloud_3pm and weather_data.cloud_3pm > 6:
            rain_probability += 0.15
        
        # Temperature factors
        temp_diff = weather_data.max_temp - weather_data.min_temp
        if temp_diff < 10:
            rain_probability += 0.1
        
        # Cap probability at 1.0
        rain_probability = min(rain_probability, 1.0)
        
        # Make prediction
        prediction = "Yes" if rain_probability > 0.5 else "No"
        
        # Determine confidence level
        if rain_probability > 0.8 or rain_probability < 0.2:
            confidence = "High"
        elif rain_probability > 0.6 or rain_probability < 0.4:
            confidence = "Medium"
        else:
            confidence = "Low"
        
        return PredictionResponse(
            prediction=prediction,
            probability=round(rain_probability, 3),
            confidence=confidence
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)