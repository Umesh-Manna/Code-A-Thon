# backend/solar.py

from fastapi import APIRouter
# from solar_services import get_latest_ultraviolet_images

router = APIRouter(prefix="/solar", tags=["Solar"])

@router.get("/ultraviolet")
def get_latest_ultraviolet():
    return get_latest_ultraviolet_images()
