import requests

def get_active_meteors():
    # For hackathon stability, keep this reliable
    return [
        {
            "title": "Perseid Meteor Shower",
            "type": "METEOR",
            "date": "2026-01-10T19:12:00",
            "visibility": 5,
            "desc": "Known for high activity and bright meteors",
            "rating": 5,
            "direction": "North East",
            "color": "#00FFAA"
        }
    ]
