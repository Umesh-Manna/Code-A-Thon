from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

# Service imports
from services.events_builder import get_all_events
from services.iss import get_iss_live_position
from services.fires import get_fire_events
from services.earth_insight import get_earth_insight
from services.space_weather import get_space_weather
from services.lunar import get_live_moon
from services.sky_weather import get_sky_weather
from services.milestones import get_milestones
from services.live_status import get_live_status
from services.missions import get_launch_missions
from services.auth import router as auth_router


# Umesh's imports
from astro import moon_now, next_lunar_eclipse
from solar import router as solar_router   # ✅ ADD THIS

app = FastAPI()

# # Updated CORS configuration to cover all common local origins
# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# ---------- CORS ----------
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # only allow your frontend
    allow_credentials=True,
    allow_methods=["*"],    # allow all HTTP methods
    allow_headers=["*"],    # allow all headers
)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"status": "SpaceScope backend running 🚀"}

# ---------- EVENTS PAGE ----------
@app.get("/events")
def events():
    return get_all_events()

# ---------- DASHBOARD GLOBE ----------
@app.get("/iss/live")
def iss_live():
    return get_iss_live_position()

@app.get("/fires")
def fires():
    return get_fire_events()

@app.get("/insight")
def insight():
    return get_earth_insight()

@app.get("/space-weather")
def space_weather():
    return get_space_weather()

@app.get("/moon")
def moon():
    return get_live_moon()

@app.get("/api/sky-weather")
def sky_weather(country: str = Query("World")):
    return get_sky_weather(country)

@app.get("/milestones")
def milestones():
    return get_milestones()

@app.get("/live-status")
def live_status():
    return get_live_status()

@app.get("/missions")
def missions():
    return get_launch_missions()


# Umesh's imports

# -----------------------------
# Existing Lunar APIs (UNCHANGED)
# -----------------------------

@app.get("/moon/now")
def moon_now_api(lat: float, lon: float):
    return moon_now(lat, lon)

@app.get("/moon/eclipse")
def eclipse_api():
    return next_lunar_eclipse()

@app.get("/test-db")
def test_db():
    try:
        # Changed "students" to "space_scope"
        result = supabase.table("space_scope").select("id,email").limit(1).execute()
        return {"status": "success", "message": "Database connected", "sample": result.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}


# -----------------------------
# Solar APIs (NEW, SAFE ADDITION)
# -----------------------------

app.include_router(solar_router)






# The "Main Guard" block is required on Windows to prevent multiprocessing crashes
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)