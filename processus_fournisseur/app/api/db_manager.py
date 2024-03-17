from fastapi import HTTPException
from .models import *
from .db import *
from sqlalchemy import insert,select


async def add_order(payload:Order):
    order_dict = payload.dict()
    if isinstance(order_dict['order_date'], datetime):
        order_dict['order_date'] = order_dict['order_date'].isoformat()
    
    if order_dict['service_delivery_date'] is not None and isinstance(order_dict['service_delivery_date'], datetime):
        order_dict['service_delivery_date'] = order_dict['service_delivery_date'].isoformat()

    query = orders.insert().values(**order_dict)
    print("query",query)
    return await database.execute(query=query)


async def get_order_by_id(order_id: str):
    query = orders.select(orders.order_is==order_id)
    return await database.fetch_one(query=query)

async def get_all_orders():
    query = select(orders)
    return await database.fetch_all(query=query)

async def add_client(payload: Client):
    client = {"client_id": payload.client_id, "username": payload.username}
    query = insert(clients).values(**client)
    return await database.execute(query=query)

async def get_all_clients():
    query = select(clients)
    return await database.fetch_all(query=query)

async def get_client_by_id(id_client: str):
    query = clients.select(clients.client_id==id_client)
    return await database.execute(query=query)