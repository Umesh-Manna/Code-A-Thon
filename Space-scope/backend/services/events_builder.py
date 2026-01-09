from datetime import datetime
from .meteors import get_active_meteors
from .iss import get_iss_event
from .space_weather import get_solar_events
from .lunar import get_lunar_events
from .human_spaceflight import get_human_spaceflight_events

def get_all_events():
    events = []

    events.extend(get_active_meteors())
    events.extend(get_iss_event())
    events.extend(get_solar_events())
    events.extend(get_lunar_events())
    events.extend(get_human_spaceflight_events())

    formatted = []
    for e in events:
        formatted.append({
            "id": f"{e['type']}-{datetime.utcnow().timestamp()}",
            "type": e["type"],
            "title": e["title"],
            "desc": e["desc"],
            "rating": e["rating"],
            "visibility": e["visibility"],
            "date": e.get("date", datetime.utcnow().strftime("%b %d, %Y, %H:%M")),
            "direction": e.get("direction", "SKY"),
            "mapImage": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
            "color": e.get("color", "#00FFAA"),
            "arrowColor": e.get("color", "#00FFAA"),
        })

    return formatted






