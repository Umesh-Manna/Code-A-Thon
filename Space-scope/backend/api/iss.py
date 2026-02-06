import requests
from fastapi import APIRouter

router = APIRouter()

@router.get("/iss/live")
def get_iss_live():
    r = requests.get("https://api.open-notify.org/iss-now.json", timeout=5)
    data = r.json()

    return {
        "lat": float(data["iss_position"]["latitude"]),
        "lng": float(data["iss_position"]["longitude"]),
        "alt": 420,
        "speed": 7.66,
    }
