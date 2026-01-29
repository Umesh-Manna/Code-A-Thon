from datetime import datetime, timedelta
import math

def moon_now(lat, lon):
    now = datetime.utcnow()

    # --- Lunar phase calculations ---
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

    # --- Approximate positional astronomy ---
    ra = round((phase * 360) % 360, 2)          # degrees
    dec = round(5 * math.sin(phase * 2 * math.pi), 2)

    altitude = round(45 * math.cos(phase * math.pi), 2)
    azimuth = round((phase * 360 + 180) % 360, 2)

    rise_time = (now - timedelta(hours=6)).strftime("%H:%M UTC")
    set_time = (now + timedelta(hours=6)).strftime("%H:%M UTC")

    distance_km = round(384400 + 20000 * math.cos(phase * 2 * math.pi), 0)
    apparent_size = round(0.49 + 0.05 * math.cos(phase * 2 * math.pi), 3)
    orbital_speed = round(1.022, 3)  # km/s (average)

    constellation = "Taurus"  # placeholder, upgradable later

    return {
        "phase": phase_name,
        "illumination": illumination,
        "age": age,

        "constellation": constellation,
        "ra": f"{ra}°",
        "dec": f"{dec}°",
        "altitude": f"{altitude}°",
        "azimuth": f"{azimuth}°",
        "rise_time": rise_time,
        "set_time": set_time,
        "distance": f"{distance_km:,} km",
        "apparent_size": f"{apparent_size}°",
        "orbital_speed": f"{orbital_speed} km/s"
    }


def next_lunar_eclipse():
    return {
        "type": "Total Lunar Eclipse",
        "date": "2026-03-03",
        "visibility": "Visible from India & Asia"
    }
