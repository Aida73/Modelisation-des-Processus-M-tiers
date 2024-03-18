from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import *
import requests
from .db_manager import *
import httpx
from .rabbit import RabbitMQReceiver

router = APIRouter()

async def save_order(payload):
    return await add_order(payload)

async def save_client(payload):
    return await add_client(payload)

async def save_devis(payload):
    return await add_devis(payload)

@router.post("/add_client")
async def new_client(payload: Client, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_client, payload)
    response = {
        'message': f"Client successfully added!"
        }
    return response


@router.get("/clients")
async def get_clients():
    clients = await get_all_clients()
    return clients

@router.get("/orders")
async def get_orders():
    orders = await get_all_orders()
    return orders


@router.get("/message_rabbit")
async def add_message(queue):
    result = await RabbitMQReceiver().receive_message_from_queue(queue)
    return result


@router.post("/devis")
async def post_devis(payload:Devis, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_devis, payload)
    response = requests.post("http://processus_fournisseur:8000/devis", json=payload.dict())
    print(response.text)
    response = {
        "message": "Devis added successfully"
    }
    return response


# add new order
@router.post("/place_order")
async def new_order(payload: Order, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_order, payload)
    response = {
        'message': "ok",
    }
    return response

@router.get("/devis")
async def get_devis():
    devis = await get_all_devis()
    return devis