#!/bin/sh

# compose the containers from the docker-compose.yml file
docker-compose up -d
# use --build flag if you make changes to docker or server related files to rebuild

# create db schema
docker exec -it server npm run migrate
# fill db schema with sample data
docker exec -it server npm run seed
