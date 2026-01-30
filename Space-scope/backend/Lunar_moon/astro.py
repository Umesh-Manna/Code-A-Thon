from datetime import datetime, timedelta
import math

# ===============================
# Constants
# ===============================
SYNODIC_MONTH = 29.530588
REF_NEW_MOON = datetime(2000, 1, 6, 18, 14)  # UTC reference new moon

PHASES = [
    ("New Moon", 0.0),
    ("First Quarter", 0.25),
    ("Full Moon", 0.5),
    ("Last Quarter", 0.75),
]

# ===============================
# Phase calculation helpers
# ===============================
def _next_phase_from(reference, target_phase):
    """
    Compute the next lunar phase AFTER a given reference datetime.
    """
    days_since_ref = (reference - REF_NEW_MOON).total_seconds() / 86400
    lunations = days_since_ref / SYNODIC_MONTH
    current_phase = lunations % 1

    delta = (target_phase - current_phase) % 1
    return reference + timedelta(days=delta * SYNODIC_MONTH)


def _next_phase_time(target_phase):
    """
    Compute next phase from 'now' (used outside the calendar).
    """
    return _next_phase_from(datetime.utcnow(), target_phase)


# ===============================
# Main API logic
# ===============================
def moon_now(lat, lon):
    now = datetime.utcnow()

    # ----- Current phase -----
    days = (now - datetime(2001, 1, 1)).days
    phase = (days / SYNODIC_MONTH) % 1

    illumination = round(abs(math.cos(phase * math.pi)) * 100, 2)
    age = round(phase * SYNODIC_MONTH, 2)

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

    # ----- Orbital geometry -----
    sun_angle = round((now.timetuple().tm_yday / 365.2422) * 360, 2)
    moon_angle = round(phase * 360, 2)

    # ----- Next full moon -----
    next_full = _next_phase_time(0.5)

    # ----- Next 4 phases -----
    next_phases = []
    for name, p in PHASES:
        t = _next_phase_time(p)
        next_phases.append({
            "name": name,
            "utc": t.isoformat()
        })

    # ===============================
    # Correct 12-month calendar
    # ===============================
    calendar = []
    cursor = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    for _ in range(12):
        row = {"month": cursor.strftime("%B %Y")}

        for name, phase_fraction in PHASES:
            t = _next_phase_from(cursor, phase_fraction)

            # If phase spills into next month, search further ahead
            if t.month != cursor.month:
                t = _next_phase_from(cursor + timedelta(days=15), phase_fraction)

            row[name] = t.isoformat()

        calendar.append(row)

        # Move to next month
        cursor += timedelta(days=32)
        cursor = cursor.replace(day=1)

    return {
        # Section 1 — Live Moon Phase (unchanged)
        "phase": phase_name,
        "illumination": illumination,
        "age": age,

        # Section 2 — Positions & calendar
        "sun_angle": sun_angle,
        "moon_angle": moon_angle,
        "next_full_moon": next_full.isoformat(),
        "next_phases": next_phases,
        "calendar": calendar
    }


def next_lunar_eclipse():
    return {
        "type": "Total Lunar Eclipse",
        "date": "2026-03-03",
        "visibility": "Visible from India & Asia"
    }
