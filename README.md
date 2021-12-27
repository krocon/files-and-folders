# Fnf

docker build . -t krocon/fnf

docker run -p 3333:3333 -p 3334:3334 -v /Users/marckronberg:/fnf/vols/marc-home -v /Users/Shared:/fnf/vols/Shared --name fnf --env=FNF_INCOMPATIBLE_PATHS='' -d krocon/fnf




docker-compose up

docker run -p 3333:3333 -p 3334:3334 -d krocon/fnf

docker exec -it 085b80c535349674d4c2f1e72f09ff8e38b9448538eed14c7e0e184349219fe1 /bin/bash
docker exec -it b39b4c4afa4b811f83721ec9381eb3c5d792b3006d6f9861fbd4405af2319960 /bin/bash


## build image
docker build . -t krocon/fnf 

## Run container
docker run -p 3333:3333 -p 3334:3334 -d krocon/fnf

open browser http://localhost:3333/

## Enter the container
$ docker exec -it <container id> /bin/bash

## Get container ID
$ docker ps

## Print app output
$ docker logs <container id>

This project was generated using [Nx](https://nx.dev).

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@fnf/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
