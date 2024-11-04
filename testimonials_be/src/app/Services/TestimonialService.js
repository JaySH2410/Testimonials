import { db } from "../../db/index.js";
import { testimonials, xTestimonials } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

export const GetAllTestimonialsBySpaceId = async (spaceId) => {
    try {
        const allTestimonials = await db
            .select()
            .from(testimonials)
            .where(eq(testimonials.spaceId, spaceId))
            .orderBy(testimonials.id, 'desc')
        return allTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}

export const GetXTestimonialsBySpaceId = async (spaceId) => {
    try {
        const allXTestimonials = await db
            .select()
            .from(xTestimonials)
            .where(eq(xTestimonials.spaceId, spaceId))
            .orderBy(xTestimonials.id, 'desc')
        return allXTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}

export const CreateTestimonials = async (spaceId, tdesc, stars, submittedBy, submittedByEmail) => {
    try {
        const newTestimonials = await db
            .insert(testimonials)
            .values({
                spaceId: spaceId,
                tdesc: tdesc,
                stars: stars,
                submittedBy: submittedBy,
                submittedByEmail: submittedByEmail
            })
            .returning({ id: testimonials.id, tdesc: testimonials.tdesc });
        console.log(newTestimonials);

        return newTestimonials;
    }
    catch (err) {
        console.log("In service", err, err.message);
        throw new Error(err.message);
        // return err;
    }
}

export const CreateXTestimonials = async (spaceId, xId) => {
    try {
        const newXTestimonials = await db
            .insert(xTestimonials)
            .values({
                spaceId: spaceId,
                xId: xId
            })
            .returning({ id: xTestimonials.id, xId: xTestimonials.xId });
        console.log(newXTestimonials);

        return newXTestimonials;
    }
    catch (err) {
        console.log("In service", err, err.message);
        throw new Error(err.message);
        // return err;
    }
}

export const LikeUnlikeTestimonials = async (id, isLiked) => {
    try {
        const likedTestimonials = await db
            .update(testimonials)
            .set({
                isLiked: isLiked
            })
            .where(eq(testimonials.id, id))
            .returning({ id: testimonials.id, isLiked: testimonials.isLiked });
        console.log(likedTestimonials);

        return likedTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}

export const LikeUnlikeXTestimonials = async (id, isLiked) => {
    try {
        const likedXTestimonials = await db
            .update(xTestimonials)
            .set({
                isLiked: isLiked
            })
            .where(eq(xTestimonials.id, id))
            .returning({ id: xTestimonials.id, isLiked: xTestimonials.isLiked });
        console.log(likedXTestimonials);

        return likedXTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}

export const GetLikedTestimonialsBySpaceId = async (spaceId) => {
    try {
        const likedTestimonials = await db
            .select()
            .from(testimonials)
            .where(
                and(
                    eq(testimonials.isLiked, true),
                    eq(testimonials.spaceId, spaceId)
                )
            )
            .orderBy(testimonials.id, 'desc')
        return likedTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}

export const GetLikedXTestimonialsBySpaceId = async (spaceId) => {
    try {
        const likedXTestimonials = await db
            .select()
            .from(xTestimonials)
            .where(
                and(
                    eq(xTestimonials.isLiked, true),
                    eq(xTestimonials.spaceId, spaceId)
                )
            )
            .orderBy(xTestimonials.id, 'desc')
        return likedXTestimonials;
    }
    catch (err) {
        console.log(err);
    }
}