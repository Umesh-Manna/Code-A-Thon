from datetime import datetime

MILESTONES = [
    # 1960s
    {
        "title": "Sputnik 1",
        "date": "1957-10-04 19:28:00",
        "agency": "USSR",
        "vehicle": "Sputnik",
        "destination": "Low Earth Orbit",
        "description": "First artificial satellite in history."
    },
    {
        "title": "Apollo 11 Moon Landing",
        "date": "1969-07-20 20:17:00",
        "agency": "NASA",
        "vehicle": "Saturn V",
        "destination": "Moon",
        "description": "First humans landed on the Moon."
    },

    # 1970s–1990s
    {
        "title": "Voyager 1 Launch",
        "date": "1977-09-05 12:56:00",
        "agency": "NASA",
        "vehicle": "Titan IIIE",
        "destination": "Interstellar Space",
        "description": "Farthest human-made object."
    },

    # 2000s
    {
        "title": "International Space Station Assembly",
        "date": "1998-11-20 06:40:00",
        "agency": "NASA / Roscosmos",
        "vehicle": "Proton",
        "destination": "Low Earth Orbit",
        "description": "Largest human-made structure in space."
    },

    # 2010s
    {
        "title": "Mars Curiosity Landing",
        "date": "2012-08-06 05:17:00",
        "agency": "NASA",
        "vehicle": "Atlas V",
        "destination": "Mars",
        "description": "Advanced rover lands on Mars."
    },

    # 2020s
    {
        "title": "James Webb Space Telescope",
        "date": "2021-12-25 12:20:00",
        "agency": "NASA / ESA / CSA",
        "vehicle": "Ariane 5",
        "destination": "L2 Orbit",
        "description": "Most powerful space telescope ever built."
    },

    {
        "title": "Chandrayaan-3 Landing",
        "date": "2023-08-23 12:33:00",
        "agency": "ISRO",
        "vehicle": "LVM3",
        "destination": "Moon (South Pole)",
        "description": "India becomes first nation to land near Moon’s south pole."
    },

    # FUTURE
    {
        "title": "Artemis III",
        "date": "2026-11-01 00:00:00",
        "agency": "NASA",
        "vehicle": "SLS",
        "destination": "Moon",
        "description": "First crewed lunar landing since Apollo."
    }
]

def get_milestones():
    output = []

    for m in MILESTONES:
        dt = datetime.strptime(m["date"], "%Y-%m-%d %H:%M:%S")
        output.append({
            **m,
            "year": dt.year,
            "date": dt.isoformat(),
            "is_now": False
        })

    now = datetime.utcnow()
    output.append({
        "title": "You are here",
        "date": now.isoformat(),
        "year": now.year,
        "agency": "Present",
        "vehicle": "",
        "destination": "Earth",
        "description": "Current moment in space exploration history.",
        "is_now": True
    })

    return sorted(output, key=lambda x: x["year"])
