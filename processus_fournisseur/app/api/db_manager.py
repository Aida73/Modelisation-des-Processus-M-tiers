from fastapi import HTTPException
from .models import *
from .db import *


async def add_order(payload:Order):
    query = orders.insert().values(**payload.model_dump())
    return await database.execute(query=query)


async def get_order_by_id(order_id: str):
    query = orders.select(orders.order_is==order_id)
    return await database.fetch_one(query=query)

async def get_all_orders():
    query = orders.select()
    return await database.fetch_all(query=query)

async def add_client(payload:Client):
    query = clients.insert().value(**payload.model_dump())
    return await database.execute(query=query)

async def get_all_clients():
    query = clients.select()
    return await database.execute(query=query)

async def get_client_by_id(id_client: str):
    query = clients.select(clients.client_id==id_client)
    return await database.execute(query=query)