from celery import Celery
from celery.schedules import timedelta
from api.db_manager import *
#from app.tasks import *
import requests
import asyncio
from asgiref.sync import async_to_sync
import os
import logging

logger = logging.getLogger(__name__)

app_cli = Celery('client_tasks',
             broker='amqp://user:password@rabbitmq:5672')

@app_cli.task
async def validate_order(order_id,status="valide"):
 return await update_order(order_id, status)


@app_cli.task(name='client_tasks.validate_devis')
def validate_devis(devis_id):
    logger.info("Réception validation devis %s", devis_id)
    try:
        response = requests.put(f"http://processus_fournisseur:8000/devis?devis_id={devis_id}&status=valide")
        if response.status_code == 200:
            print("Mise à jour réussie.")
        else:
            print(f"Échec de la mise à jour : {response.text}")
    except Exception as e:
        logger.error("Erreur lors de la mise à jour de devis: %s", str(e))
        raise e
    

if __name__ == '__main__':
    app_cli.worker_main()