from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query

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


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
