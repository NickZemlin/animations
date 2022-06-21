#-----------------------------------------------------------
# Docker
#-----------------------------------------------------------

# Wake up docker containers
up-local:
	docker-compose -f docker-compose.local.yml up -d
up:
	docker-compose -f docker-compose.server.yml up -d

# Shut down docker containers
down-local:
	docker-compose -f docker-compose.local.yml down
down:
	docker-compose -f docker-compose.server.yml down

# Show a status of each container
status-local:
	docker-compose -f docker-compose.local.yml ps
status:
	docker-compose -f docker-compose.server.yml ps

# Status alias
s-local: status-local
s: status

# Show logs of each container
logs-local:
	docker-compose -f docker-compose.local.yml logs
logs:
	docker-compose -f docker-compose.server.yml logs

logs-nginx-local:
	docker-compose -f docker-compose.local.yml logs web-nginx
logs-nginx:
	docker-compose -f docker-compose.server.yml logs web-nginx

logs-client-local:
	docker-compose -f docker-compose.local.yml logs web-client
logs-client:
	docker-compose -f docker-compose.server.yml logs web-client

#logs:
#	docker-compose -f docker-compose.local.yml logs web
#logs:
#	docker-compose -f docker-compose.server.yml logs web

# Restart all containers
restart-local: down-local up-local
restart: down up

# Build and up docker containers
build-local:
	docker-compose -f docker-compose.local.yml up -d --build
build:
	docker-compose -f docker-compose.server.yml up -d --build

# Build and up docker containers
rebuild-local: down-local build-local
rebuild: down build

connect-nginx:
	 docker exec -it web-nginx sh
up-storybook:
	 docker exec -it web-nginx yarn storybook