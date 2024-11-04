import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pkg from 'pg';
import * as schema from './schema.js';

const Pool = pkg.Pool;

const pool = new Pool({
    connectionString: "postgresql://postgres:postgres@localhost:5432/testDB?schema=public"
})

export const db = drizzle(pool);//, {schema}

// await migrate(db,{migrationFolder: "./drizzle"})

async function main() {
    console.log("Migrating...")
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migration complete!")
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(0)
})
