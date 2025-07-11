import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  out: './migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  migrations: {
    schema: 'public',
    table: 'migrations',
    prefix: 'timestamp',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});