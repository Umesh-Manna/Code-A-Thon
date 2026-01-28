from datetime import datetime
import math

def moon_now(lat, lon):
    now = datetime.utcnow()
    days = (now - datetime(2001, 1, 1)).days
    lunations = days / 29.530588
    phase = lunations % 1

    illumination = round(abs(math.cos(phase * math.pi)) * 100, 2)
    age = round(phase * 29.53, 2)

    phase_name = (
        "New Moon" if phase < 0.03 else
        "Waxing Crescent" if phase < 0.25 else
        "First Quarter" if phase < 0.28 else
        "Waxing Gibbous" if phase < 0.47 else
        "Full Moon" if phase < 0.53 else
        "Waning Gibbous" if phase < 0.75 else
        "Last Quarter" if phase < 0.78 else
        "Waning Crescent"
    )

    return {
        "phase": phase_name,
        "illumination": illumination,
        "age": age
    }

def next_lunar_eclipse():
    return {
        "type": "Total Lunar Eclipse",
        "date": "2026-03-03",
        "visibility": "Visible from India & Asia"
    }
    