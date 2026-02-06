# import requests

# NASA_FIRMS_KEY = "1661f6cde721dc42f0a179495ac4a842"

# def get_fire_events():
#     url = (
#         "https://firms.modaps.eosdis.nasa.gov/api/area/csv/"
#         f"{NASA_FIRMS_KEY}/"
#         "VIIRS_SNPP_NRT/"
#         "-180,-90,180,90/"
#         "1"
#     )

#     try:
#         res = requests.get(url, timeout=20)
#         lines = res.text.splitlines()

#         if len(lines) < 2:
#             return []

#         headers = lines[0].split(",")
#         fires = []

#         for row in lines[1:1500]:
#             values = row.split(",")
#             data = dict(zip(headers, values))

#             fires.append({
#                 "lat": float(data["latitude"]),
#                 "lng": float(data["longitude"]),
#                 "intensity": float(data.get("bright_ti4", 1)),
#             })

#         return fires

#     except Exception as e:
#         print("🔥 FIRMS ERROR:", e)
#         return []


import requests
import csv
import io

# 1. Ensure this key is valid. NASA FIRMS keys expire or hit limits easily.
NASA_FIRMS_KEY = "1661f6cde721dc42f0a179495ac4a842"

def get_fire_events():
    url = (
        "https://firms.modaps.eosdis.nasa.gov/api/area/csv/"
        f"{NASA_FIRMS_KEY}/"
        "VIIRS_SNPP_NRT/"
        "-180,-90,180,90/"  # Bounds: West, South, East, North
        "1"                 # Number of days
    )

    try:
        # 2. Increase timeout slightly for global data
        res = requests.get(url, timeout=30)
        
        # 3. Check for HTTP errors (404, 500, 429)
        if res.status_code != 200:
            print(f"🔥 FIRMS API ERROR {res.status_code}: {res.text}")
            return []

        # 4. Check if the response is actually CSV data
        content = res.text
        if "latitude" not in content:
            print("🔥 FIRMS INVALID DATA:", content[:100]) # Print first 100 chars of error
            return []

        # 5. Use the CSV library for robust parsing
        f = io.StringIO(content)
        reader = csv.DictReader(f)
        
        fires = []
        
        # Iterate through rows safely
        for i, row in enumerate(reader):
            # Limit to 3000 to prevent Frontend lag, but get enough for the globe
            if i >= 3000: 
                break
                
            try:
                # VIIRS data usually uses 'bright_ti4' for brightness/intensity
                intensity = row.get("bright_ti4") or row.get("brightness") or "1"
                
                fires.append({
                    "lat": float(row["latitude"]),
                    "lng": float(row["longitude"]),
                    "intensity": float(intensity),
                })
            except (ValueError, KeyError) as e:
                # Skip individual bad rows, don't crash the whole loop
                continue

        print(f"✅ Fetched {len(fires)} fires.")
        return fires

    except Exception as e:
        print("🔥 FIRMS CRITICAL ERROR:", e)
        return []

if __name__ == "__main__":
    # Test it immediately when running this file directly
    data = get_fire_events()
    print(data[:2]) # Print first 2 to verify
