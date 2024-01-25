docker compose up -d --build
docker exec -it server npm run migrate
docker exec -it server npm run seed
