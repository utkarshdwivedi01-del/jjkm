import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit configuration for migration generation.
 * Run: npx drizzle-kit generate
 */
export default defineConfig({
    schema: './src/db/schema/*',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});
