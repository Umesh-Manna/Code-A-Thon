from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Skywatch.Hurricanes.fetchers import fetch_all_storms
from Skywatch.Hurricanes.cache import storm_cache, is_cache_valid

app = FastAPI(
    title="Skywatch Hurricane Tracker API",
    version="1.0.0"
)

# CORS (safe default – frontend served separately)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/hurricanes")
async def get_hurricanes():
    """
    Returns cached hurricane data.
    Refreshes data if cache is expired.
    """
    if not is_cache_valid():
        storms = await fetch_all_storms()
        storm_cache.update(storms)

    return {
        "updated_at": storm_cache.updated_at,
        "storms": storm_cache.storms
    }


@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
