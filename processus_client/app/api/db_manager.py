from fastapi import HTTPException
from .models import *
from .db import *


async def add_order(payload:Order):
    query = orders.insert().values(**payload.model_dump())
    return await database.execute(query=query)


async def get_order(order_id: str):
    query = orders.select(orders.order_is==order_id)
    return await database.fetch_one(query=query)

async def get_all_orders():
    query = orders.select()
    return await database.fetch_all(query=query)

async def add_devis(payload:Devis):
    query = devis.insert().values(**payload.model_dump())
    return await database.execute(query=query)

async def valider_commande(order_id:str, status:str):
    query = orders.update().where(order_id=order_id)