from celery import Celery
from api.db_manager import update_devis


app_prov = Celery('provider_tasks',broker='amqp://user:password@rabbitmq:5672')


@app_prov.task
async def validate_devis(devis_id,status="valide"):
 return await update_devis(devis_id, status)


if __name__ == '__main__':
    app_prov.worker_main()