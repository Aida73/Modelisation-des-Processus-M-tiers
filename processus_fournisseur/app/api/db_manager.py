from fastapi import HTTPException
from .models import *
from .db import *
from sqlalchemy import insert,select


async def add_order(payload:Order):
    query = orders.insert().values(**payload.__dict__)
    return await database.execute(query=query)


async def get_order_by_id(order_id: str):
    query = orders.select(orders.order_is==order_id)
    return await database.fetch_one(query=query)

async def get_all_orders():
    query = orders.select()
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