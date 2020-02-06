build_local:
	 DOCKER_BUILDKIT=1 docker build . --tag cwmts-docker.artifactory.prostream.ru/images/frontend/app:local -f docker/app/local/Dockerfile

local_up:
	docker-compose up -d
local_up_docker:
	docker-compose up
local_down:
	docker-compose down
local_push:
	docker-compose push
local_build: build_local
	docker-compose build --build-arg USER_ID=$$(id -u) --build-arg GROUP_ID=$$(id -g)
local_build_no_cache:
	docker-compose build --no-cache --build-arg USER_ID=$$(id -u) --build-arg GROUP_ID=$$(id -g)
