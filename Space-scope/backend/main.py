from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Import Solar router ---
from app.solar.api.solar import router as solar_router

# --- Import Lunar FastAPI app AS-IS (NO CHANGES) ---
from app.Lunar_moon.main import app as lunar_app


app = FastAPI(
    title="Real-Time Space Data Backend",
    version="1.0.0"
)

# ---- Global CORS (frontend safe) ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Mount Lunar App (UNCHANGED LOGIC) ----
# Keeps:
#   /moon/now
#   /moon/eclipse
app.mount("", lunar_app)

# ---- Solar APIs ----
app.include_router(
    solar_router,
    prefix="/solar",
    tags=["Solar Data"]
)
