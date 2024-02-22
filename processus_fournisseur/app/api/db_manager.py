from fastapi import HTTPException
from .models import *
from .db import orders, database


async def add_order(payload:Order):
    query = orders.insert().values(**payload.model_dump())
    return await database.execute(query=query)


async def get_order(order_id: str):
    query = orders.select(orders.order_is==order_id)
    return await database.fetch_one(query=query)

async def get_all_orders():
    query = orders.select()
    return await database.fetch_all(query=query)
