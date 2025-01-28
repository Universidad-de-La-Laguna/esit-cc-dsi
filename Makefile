DOCKER_COMPOSE = docker compose
SERVICE = express-app
TEST_SERVICE = express-app-tests


.PHONY: build
build:
	$(DOCKER_COMPOSE) build

.PHONY: up
up:
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down:
	$(DOCKER_COMPOSE) down

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) logs $(SERVICE) -f

.PHONY: restart-all
restart-all:
	$(DOCKER_COMPOSE) restart

.PHONY: restart-app
restart-app:
	$(DOCKER_COMPOSE) restart $(SERVICE)

.PHONY: clean
clean:
	$(DOCKER_COMPOSE) down --volumes --rmi all

.PHONY: tests
tests:
	$(DOCKER_COMPOSE) up $(TEST_SERVICE)