from sqlalchemy import (Column, Integer, MetaData, String, Table, DateTime,
                        create_engine, ForeignKey, Boolean, func, TIMESTAMP)
from databases import Database
from dotenv import load_dotenv
import os


load_dotenv()


USERNAME=os.getenv('CLIENT_USERNAME')
PWD=os.getenv('CLIENT_PASSWORD')
DATABASE_URL = f'postgresql://{USERNAME}:{PWD}@client_db/client_db'
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# providers = Table(
#     'providers',
#     metadata,
#     Column('provider_id', String(50), primary_key=True),
#     Column('name', String(20)),  
# )

clients = Table(
    'clients',
    metadata,
    Column('client_id', String(50), primary_key=True),
    Column('username', String(20)),  
)

# orders = Table(
#     'orders',
#     metadata,
#     Column('order_id', String(50), primary_key=True),
#     Column('status', String(20)),
#     Column('service', String(200)),
#     Column('order_date', type_=TIMESTAMP(timezone=True)),
#     Column('service_delivery_date', type_=TIMESTAMP(timezone=True)),  
#     Column('client_id', String(50), ForeignKey('clients.client_id')),
# )

orders = Table(
    'orders',
    metadata,
    Column('order_id', String(50), primary_key=True),
    Column('status', String(20)),
    Column('service', String(200)),
    Column('order_date', type_=TIMESTAMP(timezone=True)),
    Column('service_delivery_date', type_=TIMESTAMP(timezone=True)),  
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
#heroes: List["Hero"] = Relationship(back_populates="team")

deviswithorders = Table(
    'deviswithorders',
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