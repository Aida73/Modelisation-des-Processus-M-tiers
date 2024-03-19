# from celery import Celery
# import requests
# import asyncio
# from asgiref.sync import async_to_sync

# from api.db_manager import update_devis

# # Sometimes noqa does not disable linter (Spyder IDE)
# app_prov = Celery('validate_devis',broker='amqp://user:password@rabbitmq:5672',bind=True)  # breaks coroutine execution)

# async def return_hello():
#     await asyncio.sleep(1)
#     return 'hello'

# async def save_to_db(devis_id,status):
#     await update_devis(devis_id,status)
#     print("Devis provider updateed!!")
#     return True

# import logging

# logger = logging.getLogger(__name__)

# @app_prov.task(name='validate_devis')
# def validate_devis(devis_id):
#     logger.info("Réception validation devis %s", devis_id)
#     try:
#         # Supposant que save_to_db est maintenant une fonction synchrone ou correctement exécutée de manière asynchrone
#         async_to_sync(save_to_db(devis_id, "valide"))
#         asyncio.run(save_to_db(devis_id,"valide"))
#     except Exception as e:
#         logger.error("Erreur lors de la mise à jour de devis: %s", str(e))
#         raise e
# # @app_prov.task(name='provider_tasks.validate_devis')
# # async def validate_devis(devis_id):
# #     # print("Reception validation devis", devis_id)
# #     # #return  save_to_db(devis_id,status="valide")
# #     # res = async_to_sync(return_hello)()
# #     # print(res)
# #     # return async_to_sync(save_to_db(devis_id, "valide"))
# #     await save_to_db(devis_id, "valide")

# #     response = requests.put(f"http://processus_founisseur:8000/?devis_id={devis_id}&status=valide")
# #     return response
# #     # future = asyncio.ensure_future(update_devis(devis_id, status))
# #     # loop.run_until_complete(future)
# #     # return future.result()

# # 
# # @shared_task
# # def validate_devis(devis_id, status="valide"):
# #     loop = asyncio.get_event_loop()
# #     # Pour Python 3.7 et versions ultérieures, vous pouvez aussi utiliser asyncio.run() si cela ne cause pas de conflit.
# #     future = asyncio.ensure_future(update_devis(devis_id, status))
# #     loop.run_until_complete(future)
# #     return future.result()


# if __name__ == '__main__':
#     app_prov.worker_main()