#!/bin/sh
# compose the containers from the docker-compose.yml file
docker compose up -d --build
sleep 2
docker exec -it server npm run migrate
docker exec -it server npm run seed
