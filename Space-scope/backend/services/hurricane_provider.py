import os
import requests

AMBEE_URL = "https://api.ambeedata.com/hurricane/latest"
AMBEE_API_KEY = os.getenv("AMBEE_API_KEY")

HEADERS = {
    "x-api-key": AMBEE_API_KEY,
    "Content-Type": "application/json",
}

def get_active_hurricanes():
    if not AMBEE_API_KEY:
        return []

    try:
        response = requests.get(AMBEE_URL, headers=HEADERS, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException as e:
        print("Ambee API error:", e)
        return []

    storms = []

    for storm in data.get("data", []):
        center = storm.get("center", {})
        lat = center.get("lat")
        lon = center.get("lng")

        if lat is None or lon is None:
            continue

        storms.append({
            "id": storm.get("eventId"),
            "name": storm.get("name"),
            "lat": lat,
            "lon": lon,
            "intensity": storm.get("status"),
        })

    return storms
