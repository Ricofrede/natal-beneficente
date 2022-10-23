include .env

ADMINCWD := /app
CLIENTCWD := /app
USER := $(shell /usr/bin/id -u)
ADMIN := natal-admin
CLIENT := natal-client

up:## Build the app container image (if it doesn't exists) and runs the containers
	docker-compose up

upBuild:## Rebuild the app container image and runs the containers
	docker-compose up --build

down:## Stop and remove the containers that was created by 'make up' command
	docker-compose down

install:## Runs 'yarn install'
	docker exec -it $(ADMIN) sh -c "(cd $(ADMINCWD) && yarn install)"
	docker exec -it $(CLIENT) sh -c "(cd $(CLIENTCWD) && yarn install)"

build:## Runs 'yarn build'
	docker exec -it $(ADMIN) sh -c "(cd $(ADMINCWD) && yarn build)"
	docker exec -it $(CLIENT) sh -c "(cd $(CLIENTCWD) && yarn build)"

grant:## Grant permissions to all files (Use it if you have access permissions issues)
	bash -c "sudo chmod -R a+rw . && sudo chown -R $(USER):$(USER) ."

accessAdmin:## Run an interactive bash session on back-end container
	docker exec -it $(ADMIN) sh

accessClient:## Run an interactive bash session on front-end container
	docker exec -it $(CLIENT) sh
