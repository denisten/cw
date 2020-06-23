build:
	 DOCKER_BUILDKIT=1 docker build . --tag cwmts-docker.artifactory.prostream.ru/images/frontend/app/master:local -f deploy/docker/app/local/Dockerfile
	 docker-compose build

up:
	./bin/project.init.sh
	docker-compose pull reverse_proxy backend_app backend_webserver
	docker-compose up -d
up_debug:
	up
	docker-compose logs
down:
	docker-compose down
push:
	docker-compose push
restart: down up
show-logs:
	docker-compose logs -f frontend
start: up
stop: down

dev:
	docker-compose pull reverse_proxy backend_app backend_webserver
	docker-compose -f docker-compose.dev.yml up -d
dev_stop:
	docker-compose -f docker-compose.dev.yml down
dev_restart: dev dev_stop

packages-install:
	docker exec -it cwmts_frontend yarn
packages-update:
	docker exec -it cwmts_frontend yarn upgrade
