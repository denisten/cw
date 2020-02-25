build:
	 DOCKER_BUILDKIT=1 docker build . --tag cwmts-docker.artifactory.prostream.ru/images/frontend/app/master:local -f docker/app/local/Dockerfile
	 docker-compose build
build_auth:
	 DOCKER_BUILDKIT=1 docker build . --tag cwmts-docker.artifactory.prostream.ru/images/frontend/app/feature/auth:local -f docker/app/local/Dockerfile
	 docker-compose build


up:
	./bin/project.init.sh
	docker-compose pull backend_app backend_webserver
	docker-compose up -d
up_debug:
	docker-compose pull backend_app backend_webserver
	docker-compose up
down:
	docker-compose down
push:
	docker-compose push
restart: down up
show-logs:
	docker-compose logs -f frontend


packages-install:
	docker exec -it cwmts_frontend yarn
packages-update:
	docker exec -it cwmts_frontend yarn upgrade
