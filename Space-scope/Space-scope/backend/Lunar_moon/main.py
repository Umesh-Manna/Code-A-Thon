from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from astro import moon_now, next_lunar_eclipse
from solar import router as solar_router   # ✅ ADD THIS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Existing Lunar APIs (UNCHANGED)
# -----------------------------

@app.get("/moon/now")
def moon_now_api(lat: float, lon: float):
    return moon_now(lat, lon)

@app.get("/moon/eclipse")
def eclipse_api():
    return next_lunar_eclipse()

# -----------------------------
# Solar APIs (NEW, SAFE ADDITION)
# -----------------------------

app.include_router(solar_router)
