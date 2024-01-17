from sqlalchemy import (Column, Integer, MetaData, String, Table, Datetime,
                        create_engine, ForeignKey, Boolean)
from databases import Database
from dotenv import load_dotenv
import os


load_dotenv()



DATABASE_URL = f'postgresql://{os.getenv('USER')}:{os.getenv('PASSWORD')}@process_db/process_db'
engine = create_engine(DATABASE_URL)
metadata = MetaData()

orders = Table(
    'orders',
    metadata,
    Column('order_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('service', String(200)),
    Column('order_date', Datetime),  
    Column('service_delivery_date', Datetime),   
)


metadata.create_all(engine)
database = Database(DATABASE_URL)