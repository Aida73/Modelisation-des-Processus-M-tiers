from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import client
from api.db import database
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4201",
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(client.router)

