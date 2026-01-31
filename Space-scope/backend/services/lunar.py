from datetime import datetime, timedelta
import math

# -----------------------------
# Moon phase calculations
# -----------------------------
def calculate_moon_phase(date):
    known_new_moon = datetime(2000, 1, 6, 18, 14)
    synodic_month = 29.53058867

    days = (date - known_new_moon).total_seconds() / 86400
    phase = days % synodic_month

    illumination = (1 - math.cos(2 * math.pi * phase / synodic_month)) / 2
    illumination = round(illumination * 100, 2)

    if phase < 1.84566:
        name = "New Moon"
    elif phase < 5.53699:
        name = "Waxing Crescent"
    elif phase < 9.22831:
        name = "First Quarter"
    elif phase < 12.91963:
        name = "Waxing Gibbous"
    elif phase < 16.61096:
        name = "Full Moon"
    elif phase < 20.30228:
        name = "Waning Gibbous"
    elif phase < 23.99361:
        name = "Last Quarter"
    else:
        name = "Waning Crescent"

    return name, illumination


# -----------------------------
# EVENTS PAGE (KEEP THIS)
# -----------------------------
def get_lunar_events():
    return [
        {
            "title": "Full Moon",
            "type": "LUNAR",
            "date": "2026-01-25T23:30:00",
            "visibility": 5,
            "desc": "Full Moon visible worldwide",
            "rating": 5,
            "direction": "Global",
            "color": "#B084FF"
        },
        {
            "title": "New Moon",
            "type": "LUNAR",
            "date": "2026-01-11T02:00:00",
            "visibility": 1,
            "desc": "Best time for deep sky observation",
            "rating": 2,
            "direction": "Global",
            "color": "#7F7FFF"
        }
    ]


# -----------------------------
# NEXT FULL / NEW MOON
# -----------------------------
def next_lunar_events():
    now = datetime.utcnow()
    step = timedelta(hours=1)

    found_full = None
    found_new = None
    t = now

    while not (found_full and found_new):
        name, _ = calculate_moon_phase(t)
        if name == "Full Moon" and not found_full:
            found_full = t
        if name == "New Moon" and not found_new:
            found_new = t
        t += step

    return {
        "full_moon": found_full.isoformat(),
        "new_moon": found_new.isoformat()
    }


# -----------------------------
# Moonrise / Moonset (safe approximation)
# -----------------------------
def moonrise_moonset():
    now = datetime.utcnow()
    return {
        "moonrise": now.replace(hour=18, minute=30).isoformat(),
        "moonset": (now + timedelta(days=1)).replace(hour=6, minute=15).isoformat()
    }


# -----------------------------
# LIVE MOON DASHBOARD DATA
# -----------------------------
def get_live_moon():
    now = datetime.utcnow()
    name, illumination = calculate_moon_phase(now)

    history = []
    for i in range(4):
        d = now - timedelta(days=i + 1)
        n, illum = calculate_moon_phase(d)
        history.append({
            "date": d.date().isoformat(),
            "name": n,
            "illumination": illum
        })

    return {
        "current": {
            "name": name,
            "illumination": illumination
        },
        "next": next_lunar_events(),
        "rise_set": moonrise_moonset(),
        "history": history[::-1]
    }
