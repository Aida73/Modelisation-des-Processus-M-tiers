from celery import Celery
from celery.schedules import timedelta
from api.db_manager import *
#from app.tasks import *
import os

app_cli = Celery('client_tasks',
             broker='amqp://user:password@rabbitmq:5672')

@app_cli.task
async def validate_order(order_id,status="valide"):
 return await update_order(order_id, status)

if __name__ == '__main__':
    app_cli.worker_main()