# Example of REST API

Example of REST API developed with Node.js/Express/MongoDB to manage notes
of different users.

## Containerization

Using Docker, the project has been containerized, so we'll have two containers running: mongodb + the express app.

There's a third container aimed to run the tests, but it's not essential to have the project running.

## Project commands

To run the project commands, a Makefile will be used:
- build: builds the project images.
- up: creates and run the project containers.
- down: stops the project containers.
- logs: shows the express app log messages.
- restart-all: restarts all the project containers.
- restart-app: restarts only the express app container.
- clean: stops and removes all the project containers and images.
- tests: run the tests container.

Basically, we'll have just to run: `make build` and  `make up` to have the project running.

The project root directory is binded as an inner directory at the express app container.
This way, it's not needed to rebuild the container image, when the code is modified.
To reflect the changes, it's only needed to run: `make restart-app`.


<!--
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/notes-rest-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/notes-rest-api/actions/workflows/node.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/notes-rest-api/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/notes-rest-api?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_notes-rest-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_notes-rest-api)
-->
