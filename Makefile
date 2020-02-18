build:
	 DOCKER_BUILDKIT=1 docker build . --tag cwmts-docker.artifactory.prostream.ru/images/frontend/app/master:local -f docker/app/local/Dockerfile
	 docker-compose build --build-arg USER_ID=$$(id -u) --build-arg GROUP_ID=$$(id -g)

up:
	docker-compose up -d
	npm install
	npm start -- --open-page http://web.cwmts.local
up_debug:
	docker-compose up
down:
	docker-compose down
push:
	docker-compose push
restart: down up
