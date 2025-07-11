# Test EXPRESS

Project to test express dockerization with:
- DrizzleORM + Postgres
- Redis caching
- JWT Auth
- Swagger docs
- Zod validation
- Pino logging

## Features
- CRUD for users (id, name, email, age, password)
- JWT authentication
- Redis caching for GET endpoints
- Swagger docs at `/api-docs`
- Custom error handling, logging, and validation

## Getting Started

### Prerequisites
- Docker & docker-compose
- Yarn

---

## Setup

Follow these steps to get the project up and running on your local machine:

1.  **Environment Variables:** Copy the example environment file and configure it:
    ```bash
    cp .env.example .env
    # Now, open .env and adjust the variables as needed for your local setup.
    ```
2.  **Install Dependencies:** Install all the necessary project dependencies:
    ```bash
    yarn install
    ```
3.  **Start Services:** Start your database (Postgres) and caching service (Redis) using Docker Compose:
    ```bash
    docker-compose up postgres redis -d
    ```

    OR using yarn scripts

    ```bash
    yarn compose-deps
    ```
4.  **Run Migrations:** Apply any necessary database schema changes:
    ```bash
    yarn migrate
    ```
5.  **Start Development Server:** Launch the development server to begin working on the project:
    ```bash
    yarn dev
    ```

---

## Available Scripts

Here's a list of useful scripts you can run with `yarn`:

* `yarn dev` — Starts the development server using `ts-node-dev`, with automatic restarts on file changes and `tsconfig-paths` registration for module resolution.
* `yarn build` — Compiles your TypeScript source code into JavaScript using `tsup`.
* `yarn start` — Starts the compiled Node.js server from the `dist` directory.
* `yarn migrate` — Generates Drizzle migrations and then pushes them to the database, applying schema changes.
* `yarn compose` — Brings up your Docker Compose services in detached mode.
* `yarn compose-deps` — Specifically brings up only the `postgres` and `redis` services using Docker Compose in detached mode.
* `yarn compose-force` — Forces recreation of Docker Compose containers and brings them up in detached mode. Useful for ensuring fresh containers.
* `yarn compose-build` — Rebuilds Docker Compose services from scratch (without cache) and then brings them up, forcing recreation.
* `yarn down` — Stops and removes Docker Compose containers, networks, and volumes, cleaning up orphaned containers.

---

### API
- See Swagger docs at `/api-docs`

## File Structure
- `src/config` — env, logger, jwt, redis
- `src/db` — drizzle schema & connection
- `src/routes` — express routers
- `src/controllers` — route handlers
- `src/services` — business logic
- `src/middlewares` — middleware
- `src/docs` — Swagger setup
- `src/types` — DTOs, API types
