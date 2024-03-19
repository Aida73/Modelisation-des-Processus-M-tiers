from sqlalchemy import (Column, Integer, MetaData, String, Table, DateTime,
                        create_engine, ForeignKey, Boolean)
from sqlalchemy.orm import sessionmaker
from databases import Database
from dotenv import load_dotenv
import os


load_dotenv()

USERNAME=os.getenv('PROVIDER_USERNAME')
PWD=os.getenv('PROVIDER_PASSWORD')
DATABASE_URL = f'postgresql://{USERNAME}:{PWD}@provider_db/provider_db'
engine = create_engine(DATABASE_URL)
metadata = MetaData()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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
    Column('service_delivery_date', DateTime, nullable=True),  
    Column('client_id', String(50), ForeignKey('clients.client_id')),
)

devis = Table(
    'devis',
    metadata,
    Column('devis_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('devis_date', String(200)),  
    Column('devis_delivery_date', String(200)),   
    Column('order_id', String(50), ForeignKey('orders.order_id')),
)

realisations = Table(
    'realisaions',
    metadata,
    Column('realisation_id', String(50), primary_key=True),
    Column('description', String(200)),
    Column('realisation_date', String(200)),
    Column('order_id', String(50), ForeignKey('orders.order_id')),
)


metadata.create_all(engine)
database = Database(DATABASE_URL)