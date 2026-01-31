import requests
from datetime import datetime

NOAA_SOLAR_WIND = "https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json"
NOAA_KP_INDEX = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"


# 🔹 Dashboard live data
def get_space_weather():
    solar_res = requests.get(NOAA_SOLAR_WIND).json()
    latest_solar = solar_res[-1]

    kp_res = requests.get(NOAA_KP_INDEX).json()
    latest_kp = kp_res[-1]

    solar_wind_speed = float(latest_solar[2])
    kp_index = float(latest_kp[1])

    return {
        "solarWind": round(solar_wind_speed, 1),
        "kpIndex": kp_index,
        "stormLevel": "Strong" if kp_index >= 6 else "Active" if kp_index >= 4 else "Quiet",
        "radiation": "Elevated" if kp_index >= 5 else "Normal",
        "imfBz": "Live"
    }


# 🔹 Event-card compatible data
def get_solar_events():
    data = get_space_weather()

    if data["kpIndex"] < 4:
        return []

    return [
        {
            "title": "Geomagnetic Storm",
            "type": "SPACE_WEATHER",
            "date": datetime.utcnow().isoformat(),
            "visibility": int(data["kpIndex"]),
            "desc": f"KP Index {data['kpIndex']} — Solar wind disturbance detected",
            "rating": int(data["kpIndex"]),
            "direction": "Polar Regions",
            "color": "#FFA500"
        }
    ]
