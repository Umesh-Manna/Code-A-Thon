# backend/solar_services.py

from datetime import datetime, timezone

# Local cached solar images for hackathon demo
# Served from frontend public/solar directory
LOCAL_SOLAR_IMAGES = [
    # ("91 Å",  "/solar/uv_91.png"),
    ("91 Å",  "../Space-scope/public/solar/uv_91.png"),
# "C:\Users\umesh\Documents\Code-A-Thon\SpaceScope\Code-A-Thon\Space-scope\Space-scope\public\solar\uv_91.png"
    ("131 Å", "../Space-scope/public/solar/uv_131.png"),
    ("171 Å", "../Space-scope/public/solar/uv_171.png"),
    ("193 Å", "../Space-scope/public/solar/uv_193.png"),
    ("211 Å", "../Space-scope/public/solar/uv_211.png"),
    ("304 Å", "../Space-scope/public/solar/uv_304.png"),
]

def get_latest_ultraviolet_images():
    """
    Returns locally cached solar ultraviolet images.
    Images are served from the frontend public directory
    to ensure maximum demo stability.
    """
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "images": [
            {
                "wavelength": wavelength,
                "url": url,
            }
            for wavelength, url in LOCAL_SOLAR_IMAGES
        ],
        "source": "SDO AIA (cached locally for demo)",
        "credit": "NASA / SDO",
        "note": "Images cached locally to avoid external dependency issues during demo",
    }
