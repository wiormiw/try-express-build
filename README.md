# Test EXPRESS

A modern, secure, well-typed Express/TypeScript Users API with:
- DrizzleORM + Postgres
- Redis caching
- JWT Auth
- Swagger docs
- Zod validation
- Pino logging

## Features
- CRUD for users (id, name, email, age, password)
- JWT authentication (access/refresh)
- Redis caching for GET endpoints
- Swagger docs at `/api-docs`
- Custom error handling, logging, and validation

## Getting Started

### Prerequisites
- Docker & docker-compose
- Yarn

### Setup
1. Copy `.env.example` to `.env` and adjust as needed
2. Run `yarn install`
3. Start Postgres & Redis: `docker-compose up -d`
4. Run migrations: `yarn migrate`
5. Start dev server: `yarn dev`

### Scripts
- `yarn dev` — Start dev server
- `yarn build` — Build TypeScript
- `yarn start` — Start compiled server
- `yarn migrate` — Run Drizzle migrations

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
