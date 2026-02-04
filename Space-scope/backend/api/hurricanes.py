from fastapi import APIRouter
from services.hurricane_provider import get_active_hurricanes

router = APIRouter(prefix="/hurricanes", tags=["Hurricanes"])

@router.get("")
def hurricanes():
    """
    Returns active global tropical cyclones
    """
    return {
        "updated_at": "now",
        "storms": get_active_hurricanes()
    }
