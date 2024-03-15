# Utilisation d'une image de base RabbitMQ
FROM rabbitmq:3.9

# Copie du fichier rabbitmq.conf dans le conteneur
COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

# Exposez le port par défaut de RabbitMQ
EXPOSE 5672

# Démarrez RabbitMQ lors du lancement du conteneur
CMD ["rabbitmq-server"]