.PHONY: local-rt local-rt-down local-rt-rebuild-backend local-rt-rebuild-frontend api-tests clean nuke

local-rt: local-rt-down
	docker-compose up --build

local-rt-bg: local-rt-down
	docker-compose up --build -d

local-rt-rebuild-backend: local-rt-down
	docker-compose up --build backend-server

local-rt-rebuild-frontend: local-rt-down
	docker-compose up --build frontend-server

local-rt-down:
	docker-compose down

api-tests:
	./api_tests.sh 

clean:
	docker volume rm --force $(shell docker volume ls -q)

nuke: clean
	yes | docker system prune -a