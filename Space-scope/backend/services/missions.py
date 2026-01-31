from datetime import datetime, timedelta

def get_launch_missions():
    return [
        {
            "mission_id": "SPX-CRW-11",
            "mission_name": "Crew Dragon ISS Rotation",
            "agency": "SpaceX",
            "vehicle": "Falcon 9 Block 5",
            "launch_site": "LC-39A, Kennedy Space Center",
            "launch_time": (datetime.utcnow() + timedelta(minutes=42)).isoformat(),
            "orbit": "LEO",
            "mission_type": "HUMAN_SPACEFLIGHT"
        },
        {
            "mission_id": "ISRO-GAG-1",
            "mission_name": "Gaganyaan Test Vehicle",
            "agency": "ISRO",
            "vehicle": "LVM3",
            "launch_site": "Satish Dhawan Space Centre",
            "launch_time": (datetime.utcnow() + timedelta(hours=3)).isoformat(),
            "orbit": "LEO",
            "mission_type": "HUMAN_SPACEFLIGHT"
        },
        {
            "mission_id": "NASA-ART-2",
            "mission_name": "Artemis II Crewed Mission",
            "agency": "NASA",
            "vehicle": "SLS Block 1",
            "launch_site": "LC-39B, Kennedy Space Center",
            "launch_time": (datetime.utcnow() + timedelta(days=1)).isoformat(),
            "orbit": "Trans-Lunar",
            "mission_type": "HUMAN_SPACEFLIGHT"
        }
    ]
