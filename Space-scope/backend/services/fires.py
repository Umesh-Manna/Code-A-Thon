import requests

NASA_FIRMS_KEY = "1661f6cde721dc42f0a179495ac4a842"

def get_fire_events():
    url = (
        "https://firms.modaps.eosdis.nasa.gov/api/area/csv/"
        f"{NASA_FIRMS_KEY}/"
        "VIIRS_SNPP_NRT/"
        "-180,-90,180,90/"
        "1"
    )

    try:
        res = requests.get(url, timeout=20)
        lines = res.text.splitlines()

        if len(lines) < 2:
            return []

        headers = lines[0].split(",")
        fires = []

        for row in lines[1:1500]:
            values = row.split(",")
            data = dict(zip(headers, values))

            fires.append({
                "lat": float(data["latitude"]),
                "lng": float(data["longitude"]),
                "intensity": float(data.get("bright_ti4", 1)),
            })

        return fires

    except Exception as e:
        print("🔥 FIRMS ERROR:", e)
        return []
