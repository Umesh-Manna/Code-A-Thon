import requests
from datetime import datetime
from countryinfo import CountryInfo

API_KEY = "d72417c178e7e0e19db8fd0788f2789d"

# ---------------- MAIN FUNCTION ----------------
def get_sky_weather(country: str = "World"):
    if country == "World":
        lat, lon = 0, 0   # Global average
    else:
        lat, lon = country_to_latlon(country)

    url = (
        "https://api.openweathermap.org/data/2.5/forecast"
        f"?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    )

    res = requests.get(url).json()

    if "list" not in res:
        return fallback_data()

    forecast = []
    qualities = []

    for item in res["list"][:8]:  # 24 hours
        cloud = item["clouds"]["all"]
        wind = item["wind"]["speed"]
        temp = item["main"]["temp"]

        quality = max(0, 100 - cloud - int(wind * 3))
        qualities.append(quality)

        forecast.append({
            "time": datetime.fromtimestamp(item["dt"]).strftime("%H:%M"),
            "quality": quality
        })

    avg_quality = sum(qualities) // len(qualities)

    return {
        "score": avg_quality,
        "verdict": verdict(avg_quality),
        "cloudCover": cloud,
        "wind": int(wind),
        "temperature": int(temp),
        "moonImpact": "Moderate",
        "forecast": forecast,
        "bestFor": best_for(avg_quality),
        "country": country
    }


# ---------------- HELPERS ----------------
def country_to_latlon(country):
    try:
        info = CountryInfo(country)
        lat, lon = info.latlng()
        return lat, lon
    except:
        return 0, 0  # fallback


def verdict(score):
    if score >= 75: return "Excellent"
    if score >= 55: return "Good"
    if score >= 35: return "Fair"
    return "Poor"


def best_for(score):
    if score >= 75:
        return ["Astrophotography", "Deep Sky Objects"]
    if score >= 55:
        return ["Moon", "Planets"]
    if score >= 35:
        return ["Casual Viewing"]
    return ["Not Recommended"]


def fallback_data():
    return {
        "score": 0,
        "verdict": "Unavailable",
        "cloudCover": 0,
        "wind": 0,
        "temperature": 0,
        "moonImpact": "Unknown",
        "forecast": [],
        "bestFor": ["No data"],
        "country": "Unknown"
    }

