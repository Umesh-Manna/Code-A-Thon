from datetime import datetime

def get_live_status():
    return {
        "title": "You are here",
        "time": datetime.utcnow().isoformat(),
        "humans_in_space": 7,
        "iss_status": "Orbiting Earth (~408 km)",
        "active_missions": [
            "ISS Expedition 71",
            "James Webb Space Telescope",
            "Mars Perseverance Rover"
        ],
        "description": "This marker represents the current moment in space exploration history."
    }
