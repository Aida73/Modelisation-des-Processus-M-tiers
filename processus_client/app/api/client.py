from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import Order
from .db_manager import *
import httpx

router = APIRouter()

@router.get("/orders")
async def add_order(payload: Order, background_tasks: BackgroundTasks):
    #background_tasks.add_tasks(save_order, payload)
    response = {
        'message': f"ok",
    }
    return response