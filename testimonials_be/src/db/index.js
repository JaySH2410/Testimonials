import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from './schema.js';

const {Client} = pkg;

const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/testDB?schema=public"
})

client.connect();

export const db = drizzle(client, {schema: schema});

// console.log(module);    