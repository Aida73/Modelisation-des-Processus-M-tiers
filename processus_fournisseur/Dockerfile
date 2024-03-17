FROM python:3.9

WORKDIR /app

COPY requirements.txt .
COPY .env .
COPY . .

RUN apt-get update 
# && apt-get install gcc -y \
# && apt-get clean

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ /app/

CMD ["uvicorn","main:app","--reload","--host","0.0.0.0","--port", "8000"]