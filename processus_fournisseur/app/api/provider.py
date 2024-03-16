from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import Order
from .db_manager import *
import httpx
from .rabbit import RabbitMQSender


router = APIRouter()


async def save_order(payload):
    return await add_order(payload)

async def add_client(payload):
    return await add_client(payload)


def check_order(order_id: int, background_tasks: BackgroundTasks):
    status = "valide"
    # ..../1
    verif_status = {'order_id':order_id, status:status}
    background_tasks.add_task(confirm_order, verif_status)


def confirm_order(verif_status):
    with httpx.Client() as client:
        response = client.post("client-endponit", json=verif_status)
    print(response.text)



# add new order
@router.post("/place_order")
async def add_order(payload: Order, background_tasks: BackgroundTasks):
    background_tasks.add_tasks(save_order, payload)
    response = {
        'message': f"Votre commande numero a été bien reçue et est en cours de traitement",
    }
    with httpx.Client() as client:
        response = client.post("http://localhost:8001/place_order", json=payload)
    return response

@router.get("/orders")
async def get_orders():
    orders = await get_all_orders()
    return orders

@router.post("/message_rabbit")
async def send_message(queue, message):#payload: Order, background_tasks: BackgroundTasks):
    # background_tasks.add_tasks(save_order, payload)
    sender = await RabbitMQSender().send_message(queue, message)
    return sender


@router.post("/add_client")
async def add_client(payload: Order, background_tasks: BackgroundTasks):
    background_tasks.add_tasks(add_client, payload)
    response = {
        'message': f"Client successfully added!",
    }
    return response

@router.get("/clients")
async def get_clients():
    clients = await get_all_clients()
    return clients
