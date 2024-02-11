from sqlalchemy import (Column, Integer, MetaData, String, Table, Datetime,
                        create_engine, ForeignKey, Boolean)
from databases import Database
from dotenv import load_dotenv
import os


load_dotenv()



DATABASE_URL = f'postgresql://{os.getenv('USER')}:{os.getenv('PASSWORD')}@process_db/process_db'
engine = create_engine(DATABASE_URL)
metadata = MetaData()

providers = Table(
    'providers',
    metadata,
    Column('provider_id', String(50), primary_key=True),
    Column('name', String(20)),  
)

orders = Table(
    'orders',
    metadata,
    Column('order_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('service', String(200)),
    Column('order_date', Datetime),
    Column('service_delivery_date', Datetime),  
    Column('provider_id', String(50), ForeignKey('providers')),
)

devis = Table(
    'devis',
    metadata,
    Column('order_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('devis_date', Datetime),  
    Column('devis_delivery_date', Datetime),   
)

realisations = Table(
    'realisaions',
    metadata,
    Column('realisation_id', String(50), primary_key=True),
    Column('order_id', String(50), ForeignKey('devis')),
    Column('status', String(20)),
    Column('realisation_date', Datetime)
)



metadata.create_all(engine)
database = Database(DATABASE_URL)