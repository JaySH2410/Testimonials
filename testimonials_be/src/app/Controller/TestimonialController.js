import { desc } from 'drizzle-orm';
import * as TestimonialService from '../Services/TestimonialService.js'
import { testimonials } from '../../db/schema.js';

export async function GetAllTestimonialsBySpaceId(req, res) {
    const { spaceId, type } = req.query;
    try {
        var allTestimonials;
        if (type === "text") {
            allTestimonials = await TestimonialService.GetAllTestimonialsBySpaceId(spaceId);
        } else if (type === "x") {
            allTestimonials = await TestimonialService.GetXTestimonialsBySpaceId(spaceId);
        }
        return res.json(allTestimonials);
    }
    catch (err) {
        return res.status(500).json({ error: 'Some error occured' });
    }
}

export async function CreateTestimonials(req, res) {
    const { spaceId, tdesc, starRate, submittedBy, submittedByEmail } = req.body;
    try {
        // const submittedOn = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        // console.log(submittedOn);
        const stars = starRate.toString();
        const newTestimonials = await TestimonialService.CreateTestimonials(spaceId, tdesc, stars, submittedBy, submittedByEmail);
        return res.status(201).json({
            message: 'Testimonials created',
            id: newTestimonials[0].id,
            tdesc: newTestimonials[0].tdesc
        });
    }
    catch (err) {
        console.log("In Controller", err);

        return res.status(500).json({ error: 'Failed to create testimonials', description: err.message });
    }
}

export async function CreateXTestimonials(req, res) {
    const { spaceId, xId } = req.body;
    try {
        const newXTestimonials = await TestimonialService.CreateXTestimonials(spaceId, xId);
        return res.status(201).json({
            message: 'XTestimonials created',
            id: newXTestimonials[0].id,
            xId: newXTestimonials[0].xId
        });
    }
    catch (err) {
        console.log("In Controller", err);

        return res.status(500).json({ error: 'Failed to create XTestimonials', description: err.message });
    }
}

export async function LikeUnlikeTestimonials(req, res) {
    const { id, isLiked, type } = req.body;
    try {
        var likedTestimonials;
        if (type === "text") {
            likedTestimonials = await TestimonialService.LikeUnlikeTestimonials(id, isLiked);
        } else if (type === "x") {
            likedTestimonials = await TestimonialService.LikeUnlikeXTestimonials(id, isLiked);
        }
        return res.status(201).json({
            message: `Testimonials ${isLiked ? 'liked' : 'unliked'}`,
            id: likedTestimonials[0].id,
            isLiked: likedTestimonials[0].isLiked
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({ error: 'Failed to like testimonials' });
    }
}

export async function GetLikedTestimonialsBySpaceId(req, res) {
    const { spaceId, type } = req.query;
    try {
        var likedTestimonials;
        if (type === "text") {
            likedTestimonials = await TestimonialService.GetLikedTestimonialsBySpaceId(spaceId);
        } else if (type === "x") {
            likedTestimonials = await TestimonialService.GetLikedXTestimonialsBySpaceId(spaceId);
        }
        return res.status(200).json(likedTestimonials);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to get liked testimonials' });
    }
}
