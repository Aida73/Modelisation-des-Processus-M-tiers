from sqlalchemy import (Column, Integer, MetaData, String, Table, DateTime,
                        create_engine, ForeignKey, Boolean)
from databases import Database
from dotenv import load_dotenv
import os

load_dotenv()

USERNAME=os.getenv('USERNAME')
PWD=os.getenv('PASSWORD')
DATABASE_URL = f'postgresql://{USERNAME}:{PWD}@db/process_db'
engine = create_engine(DATABASE_URL)
metadata = MetaData()

clients = Table(
    'clients',
    metadata,
    Column('client_id', String(50), primary_key=True),
    Column('username', String(20)),  
)

orders = Table(
    'orders',
    metadata,
    Column('order_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('service', String(200)),
    Column('order_date', DateTime),
    Column('service_delivery_date', DateTime),  
    Column('client_id', String(50), ForeignKey('clients.client_id')),
)

devis = Table(
    'devis',
    metadata,
    Column('devis_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('devis_date', DateTime),  
    Column('devis_delivery_date', DateTime),   
    Column('order_id', String(50), ForeignKey('orders.order_id')),
)

realisations = Table(
    'realisaions',
    metadata,
    Column('realisation_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('realisation_date', DateTime),
    Column('order_id', String(50), ForeignKey('orders.order_id')),
)


metadata.create_all(engine)
database = Database(DATABASE_URL)