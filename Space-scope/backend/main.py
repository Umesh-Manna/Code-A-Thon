from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.events_builder import get_all_events

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

@app.get("/events")
def events():
    return get_all_events()


