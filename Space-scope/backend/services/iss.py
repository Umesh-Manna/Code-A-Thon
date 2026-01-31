def get_iss_event():
    return [
        {
            "title": "ISS Pass Over Delhi",
            "type": "ISS",
            "date": "2026-01-12T18:40:00",
            "visibility": 5,
            "desc": "Bright ISS pass visible for 6 minutes",
            "rating": 5,
            "direction": "North West",
            "color": "#00BFFF"
        },
        {
            "title": "ISS Pass Over Mumbai",
            "type": "ISS",
            "date": "2026-01-14T19:05:00",
            "visibility": 4,
            "desc": "Clear overhead ISS pass",
            "rating": 4,
            "direction": "South",
            "color": "#00BFFF"
        },
        {
            "title": "ISS Pass Over Bengaluru",
            "type": "ISS",
            "date": "2026-01-16T05:42:00",
            "visibility": 3,
            "desc": "Low elevation ISS pass before sunrise",
            "rating": 3,
            "direction": "East",
            "color": "#00BFFF"
        }
    ]

# ---------- LIVE ISS POSITION (for Globe) ----------
import requests
from datetime import datetime

def get_iss_live_position():
    try:
        res = requests.get(
            "https://api.wheretheiss.at/v1/satellites/25544",
            timeout=5
        )
        data = res.json()

        return {
            "lat": data["latitude"],
            "lng": data["longitude"],
            "altitude": data["altitude"],
            "velocity": data["velocity"],
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {"error": str(e)}



