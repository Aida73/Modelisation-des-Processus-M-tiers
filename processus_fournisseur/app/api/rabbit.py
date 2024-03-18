import json
import aio_pika
import logging
from contextlib import asynccontextmanager


class RabbitMQSender:
    @asynccontextmanager
    async def get_connection(self):

        connection = await aio_pika.connect_robust(
            host="rabbitmq",
            login="user",
            password="password"
        )
        async with connection:
            channel = await connection.channel()
            try:
                yield channel
            finally:
                pass

    async def send_message(self, queue:str, message):

        try:
            async with self.get_connection() as channel:
                json_to_send = json.dumps(message)
                await self.message(channel, queue, json_to_send)
                logging.info("Sent command to queue")
                return 200

        except Exception as exception:
            logging.error("Error sending command to queue: %s", exception)
            return 500

    async def message(self, channel, queue, message):
        print(f"Sending message to queue in sender: {message}")
        queue = await channel.declare_queue(queue, durable=True)
        await channel.default_exchange.publish(
            aio_pika.Message(body=message.encode()),
            routing_key=queue.name,
        )
        
        
class RabbitMQReceiver:
    @asynccontextmanager
    async def get_connection(self):

        connection = await aio_pika.connect_robust(
            host="rabbitmq",
            login="user",
            password="password")
        async with connection:
            channel = await connection.channel()
            try:
                yield channel
            finally:
                pass

    async def receive_message_from_queue(self, queue):
        try:
            async with self.get_connection() as channel:
                json_to_send = await self.read_message(channel, queue)
                logging.info("Received message from queue")
                return json_to_send

        except Exception as exception:
            logging.error("Error receving book from queue", exception)

    async def read_message(self, channel, queue):
        try:
            async with self.get_connection() as channel:
                queue = await channel.declare_queue(queue, durable=True)
                async with queue.iterator() as queue_iter:
                    async for message in queue_iter:
                        async with message.process():
                            received_message = message.body.decode()
                            logging.info("Received message from queue: %s", received_message)
                            return received_message

        except Exception as exception:
            logging.error("Error reading message from queue", exception)