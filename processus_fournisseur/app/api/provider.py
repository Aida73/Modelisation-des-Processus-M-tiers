from fastapi import APIRouter, BackgroundTasks, HTTPException
from .models import Order
import requests
from .db_manager import *
from app.provider_tasks import app_prov
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

async def modify_order(id:str, status: str):
    return await update_order(id, status)

async def modify_devis(id:str, status: str):
    return await update_devis(id, status)

async def update_ex_order(order_id: str, update_values: dict):
    try:
        await update_order(order_id, update_values)
        print("Order updated successfully")
    except Exception as e:
        print(f"Failed to update order: {e}")


def check_order(order_id: int, background_tasks: BackgroundTasks):
    status = "valide"
    # ..../1
    verif_status = {'order_id':order_id, status:status}
    background_tasks.add_task(confirm_order, verif_status)


def confirm_order(verif_status):
    with httpx.Client() as client:
        response = client.post("client-endponit", json=verif_status)
    print(response.text)



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
    response_client = requests.post("http://processus_client:8000/place_order", json=data)
    print(response_client.text)
    return response


@router.get("/orders")
async def get_orders():
    orders = await get_all_orders()
    return orders


@router.put("/orders/{order_id}")
async def update_existing_order(background_tasks: BackgroundTasks, order_id: str, payload: OrderUpdate):
    update_values = payload.dict(exclude_unset=True)
    background_tasks.add_task(update_ex_order, order_id, update_values)
    app_prov.send_task("provider_tasks.validate_order",args=[order_id, update_values])
    # if update_values.status=="valide":
    #     app_prov.send_task("client_tasks.validate_order",args=[order_id])
    return {"message": "Order update initiated"}


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


@router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await get_order_by_id(order_id)
    return order


@router.get("/orders/clients/{client_id}")
async def get_orders_client(client_id: str):
    orders = await get_orders_by_client(client_id)
    return orders


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

@router.put("/devis")
async def put_devis(devis_id: str, status: str, backgroundtasks: BackgroundTasks):
    backgroundtasks.add_task(modify_devis, devis_id, status)
    response = {
        "message": "Status updated successfully initialized!!!"
    }  
    return response


@router.get("/statistics")
async def get_statistiques():
    devis = await get_all_devis()
    clients = await get_all_clients()
    orders = await get_all_orders()

    response = {
        "devis": len(devis),
        "clients": len(clients),
        "orders": len(orders)
    }
    return response

@router.get("/devis/statistics")
async def get_devis_statistiques():
    r1 = await get_pending_devis()
    r2 = await get_confirmed_devis()
    response = {
        "confirmed": len(r1),
        "pending": len(r2)
    }
    return response

@router.get("/orders/statistics")
async def get_orders_statistiques():
    r1 = await get_orders_pending()
    r2 = await get_orders_confirmed()
    r3 = await get_orders_realized()
    response = {
        "pending": len(r1)
        #"valide": len(r2),
        #"realise": len(r3)
    }
    return response

