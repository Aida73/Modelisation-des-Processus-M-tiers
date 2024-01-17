from pydantic import BaseModel
from datetime import datetime


class Order(BaseModel):
    order_id: str
    service: str
    status: str
    order_date: datetime
    service_delivery_date: datetime

