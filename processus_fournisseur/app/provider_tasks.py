from celery import Celery
from celery.schedules import timedelta
from api.db_manager import *
import json
#from app.tasks import *
import requests
import asyncio
from asgiref.sync import async_to_sync
import os
import logging

logger = logging.getLogger(__name__)

app_prov = Celery('provider_tasks',
             broker='amqp://user:password@rabbitmq:5672')

@app_prov.task(name='provider_tasks.validate_order')
def validate_order(order_id, values):
    logger.info("Réception validation commande %s", order_id)
    if 'service_delivery_date' in values and isinstance(values['service_delivery_date'], datetime):
        values['service_delivery_date'] = values['service_delivery_date'].isoformat()
    try:
        response = requests.put(f"http://processus_client:8000/orders/{order_id}", json=values)
        if response.status_code == 200:
            print("Mise à jour commande réussie.")
        else:
            print(f"Échec de la mise à jour : {response.text}")
    except Exception as e:
        logger.error("Erreur lors de la mise à jour de devis: %s", str(e))
        raise e
    

if __name__ == '__main__':
    app_prov.worker_main()