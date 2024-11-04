import { db } from "./migrate";
import { users } from "./schema";

export const result = await db.select().from(users);

