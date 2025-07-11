# Multi-stage build
# Step 1: Install all deps needed to build
FROM node:20-slim as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Step 2: Build
FROM deps as build
COPY . .
RUN yarn build

# Step 3: Install only prod-deps
FROM node:20-slim as prod-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Step 4: Distroless runtime
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json
CMD ["dist/server.js"]