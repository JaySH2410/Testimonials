import { db } from "../../db/index.js";
import { spaces } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const GetAllSpaceByUserId = async (userId) => {
    try {
        console.log(userId);

        const allSpaces = await db
            .select()
            .from(spaces)
            .where(eq(spaces.userId, userId))
            .orderBy(spaces.id, 'desc')
        return allSpaces;
    }
    catch (err) {
        console.log(err);
    }
}

export const CreateSpace = async (userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3) => {
    try {
        const newSpace = await db
            .insert(spaces)
            .values({
                userId: userId,
                sname: sname,
                tname: tname,
                tdescription: tdescription,
                picture: picture,
                isStarRating: isStarRating,
                que1: que1,
                que2: que2,
                que3: que3
            })
            .returning({ id: spaces.id, name: spaces.sname });
        console.log(newSpace);

        return newSpace;
    }
    catch (err) {
        console.log(err);
    }
}

export const EditSpace = async (id, userId, sname, tname, tdescription, picture, isStarRating, que1, que2, que3) => {
    try {
        const updatedSpace = await db
            .update(spaces)
            .set({
                sname: sname,
                tname: tname,
                tdescription: tdescription,
                picture: picture,
                isStarRating: isStarRating,
                que1: que1,
                que2: que2,
                que3: que3
            })
            .where(eq(spaces.id, id))
            .returning({ id: spaces.id, sname: spaces.sname });
        console.log("service",updatedSpace);

        return updatedSpace;
    }
    catch (err) {
        console.log(err);
    }
}

export const GetSpaceDetailsById = async (id) => {
    try {
        const spaceDetails = await db
            .select()
            .from(spaces)
            .where(eq(spaces.id, id))
            .orderBy(spaces.id, 'desc')
        return spaceDetails;
    }
    catch (err) {
        console.log(err);
    }
}

// export const EditSpace = async () => {

// }


// console.log(module.exports);
