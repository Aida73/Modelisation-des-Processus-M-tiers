from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import Order
import requests
from .db_manager import *
import json
import httpx
from .rabbit import RabbitMQSender
import json
import requests


router = APIRouter()


async def save_order(payload):
    return await add_order(payload)

async def save_client(payload):
    return await add_client(payload)

async def save_devis(payload):
    return await add_devis(payload)


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
async def new_order(payload: Order, background_tasks: BackgroundTasks):

    background_tasks.add_task(save_order, payload)
    response = {
        'message': f"Votre commande numero a été bien reçue et est en cours de traitement",
    }
    
    print("payload json", payload.dict())
    data = payload.dict()
    data.pop('order_date')
    print(data)
    
    # async with httpx.AsyncClient() as client:
    #     response = await client.post("http://processus_client:8000/place_order", json=data)
    #     print(response.text)
    response_client = requests.post("http://processus_client:8000/place_order", json=data)
    print(response_client.text)
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
async def new_client(payload: Client, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_client, payload)
    #id_client = await add_client(payload)
    response = {
        'message': f"Client successfully added!"
        }
    return response

@router.get("/clients")
async def get_clients():
    clients = await get_all_clients()
    return clients

@router.post("/devis")
async def post_devis(payload:Devis, background_tasks: BackgroundTasks):
    background_tasks.add_task(save_devis, payload)
    response = {
        "message": "Devis added successfully!!!"
    }
    return response


@router.get("/devis")
async def get_devis():
    devis = await get_all_devis()
    return devis