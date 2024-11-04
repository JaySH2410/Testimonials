import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { count, eq } from 'drizzle-orm';



export const GetAllUsers = async () => {
    try {
        const allUsers = await db
            .select()
            .from(users)
            .orderBy(users.id, 'desc')
        // console.log(allUsers);
        return allUsers;
    }
    catch (err) {
        console.log(err);
    }
}

export const CreateUser = async (name, email, picture) => {
    try {
        const newUser = await db
            .insert(users)
            .values({ name, email, picture })
            .returning({ id: users.id, name: users.name, email: users.email, picture: users.picture })
        return newUser;
    }
    catch (err) {
        console.log(err);
    }
}

export const ExistingUser = async (email) => {
    try {
        const existingUser =
            await db
                .select({ count: count(users.email), id: users.id })
                .from(users)
                .where(eq(users.email, email))
        console.log(existingUser[0]);
        // const existingUser = value === 1 ? true : false
        return existingUser;
    }
    catch (err) {
        console.log(err);

    }
}

export const GetUserDetailsByEmail = async (email) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .orderBy(users.id, 'desc')
        console.log(user);
        return user;
    }
    catch (err) {
        console.log(err);
    }
}
