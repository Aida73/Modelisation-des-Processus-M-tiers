# Modelisation-des-Processus-M-tiers

L'idée de ce projet est de développer un système de traitement de commandes asynchrone en utilisant FastAPI. Le système se compose de deux composants principaux : un processus client pour passer des commandes et un processus fournisseur pour gérer les demandes de commande, générer des devis et confirmer les commandes.

# Demo

![Page_Web](/screenshots/demo.gif?raw=true)

## Variables d'environnement

Pour lancer le projet, vous devez:

Créer un fichier .env dans le dossier `processus_fournisseur` et `processus_client`  et ajouter un utilisateur pour les bases de données Postgres:

`PROVIDER_USERNAME=unusername` `CLIENT_USERNAME=unusername`
`PROVIDER_PASSWORD=unpassword` `CLIENT_PASSWORD=unpassword`

Assurer d'allumer votre Docker.

    
## Lancer le projet

Cloner le projet

- Lancer tous les services:

```bash
    git clone [https://github.com/Aida73/Modelisation-des-Processus-Metiers.git](https://github.com/Aida73/Modelisation-des-Processus-Metiers.git)
```

Se positionner à la racine du projet et lancer tous les services(il peut prendre un moment la première fois):

```bash
    docker-compose up --build
```
Pour tester les enpoints développées vous pouvez visister les pages:
- http://localhost:8001/docs pour le processus client
- http://localhost:8002/docs pour le processus fournisseur

- Lancer l'application web localement

Avant le lancement, assurez vous d'ajouter l'application angular comme client au niveau du serveur keycloak(cf demo). Vous utiliserez le fichier de configuration `realm-keycloak-processus-metiers.json` pour configurer keycloak et ajouter des utilisateurs.

```bash
    cd ui_frontend/ui_frontend
    npm install
    ng serve --port 4201
```


