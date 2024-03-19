from celery import Celery
import requests
import asyncio
from api.db_manager import update_devis


app_prov = Celery('provider_tasks',broker='amqp://user:password@rabbitmq:5672')

async def save_to_db(devis_id,status):
    return await update_devis(devis_id,status)

@app_prov.task
def validate_devis(devis_id):
    print("Reception validation devis", devis_id)
    return  save_to_db(devis_id,status="valide")

#     response = requests.put(f"http://processus_founisseur:8000/?devis_id={devis_id}&status=valide")
#     return response
#     # future = asyncio.ensure_future(update_devis(devis_id, status))
#     # loop.run_until_complete(future)
#     # return future.result()

# 
# @shared_task
# def validate_devis(devis_id, status="valide"):
#     loop = asyncio.get_event_loop()
#     # Pour Python 3.7 et versions ultérieures, vous pouvez aussi utiliser asyncio.run() si cela ne cause pas de conflit.
#     future = asyncio.ensure_future(update_devis(devis_id, status))
#     loop.run_until_complete(future)
#     return future.result()


if __name__ == '__main__':
    app_prov.worker_main()