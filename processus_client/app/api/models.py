from pydantic import BaseModel
from datetime import datetime


# class Provider(BaseModel):
#     provider_id: str
#     name: str

class Client(BaseModel):
    client_id = str
    name = str
class Order(BaseModel):
    order_id: str
    service: str
    status: str
    order_date: datetime
    service_delivery_date: datetime
    client_id: str


class Devis(BaseModel):
    devis_id: str
    order_id: str
    status: str
    devis_date: datetime
    devis_delivery_date: datetime

class Realisation(BaseModel):
    realisation_id: str
    order_id: str
    status: str
    realisation_date: datetime


