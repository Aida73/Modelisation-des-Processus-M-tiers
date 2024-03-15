from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import Order
from .db_manager import *
import httpx
from .rabbit import RabbitMQReceiver

router = APIRouter()

@router.get("/orders")
async def add_order(payload: Order, background_tasks: BackgroundTasks):
    #background_tasks.add_tasks(save_order, payload)
    response = {
        'message': f"ok",
    }
    return response


@router.get("/message_rabbit")
async def add_message():
    result = await RabbitMQReceiver().receive_message_from_queue()
    return result