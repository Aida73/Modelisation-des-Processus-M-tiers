from fastapi import FastAPI
from api import client
from api.db import database
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(client.router)

