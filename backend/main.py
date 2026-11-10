import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Replace the value below with your OpenWeatherMap API key (https://openweathermap.org/api)


API_KEY = os.getenv("OPENWEATHER_API_KEY", "")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/weather")
def get_weather(city: str = Query(..., description="City name")):
    if API_KEY == "":
        return {"error": "No API key set. Replace API_KEY in backend/main.py with your OpenWeatherMap API key."}
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        try:
            msg = response.json().get('message', 'API error')
        except Exception:
            msg = 'API error'
        return {"error": f"City not found or API error: {msg}"}
    data = response.json()
    return {
        "city": data.get("name"),
        "temperature": data.get("main", {}).get("temp"),
        "description": data.get("weather", [{}])[0].get("description"),
        "humidity": data.get("main", {}).get("humidity"),
        "wind_speed": data.get("wind", {}).get("speed")
    }
