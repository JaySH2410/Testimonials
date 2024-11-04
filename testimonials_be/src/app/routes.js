import { Router } from 'express';
import * as UserController from './Controller/UserController.js';
import * as SpaceController from './Controller/SpaceController.js';
import * as TestimonialController from './Controller/TestimonialController.js';
import * as ApifyContoller from './Controller/ApifyController.js';

export const router = Router();

// User Routes
router.get('/api/getAllUsers', UserController.GetAllUsers);
router.post('/api/createNewUser', UserController.CreateUser);
router.get('/api/existingUser', UserController.ExistingUser);
router.get('/api/getUserDetailsByEmail', UserController.GetUserDetailsByEmail);

// Space Routes
router.get('/api/getAllSpacesByUserId', SpaceController.GetAllSpacesByUserId);
router.post('/api/createSpace', SpaceController.CreateSpace);
router.post('/api/editSpace', SpaceController.EditSpace);
router.get('/api/getSpaceDetailsById', SpaceController.GetSpaceDetailsById);

//Testimonials Routes
router.get("/api/getAllTestimonialsBySpaceId", TestimonialController.GetAllTestimonialsBySpaceId)
// router.get("/api/getXTestimonialsBySpaceId", TestimonialController.GetXTestimonialsBySpaceId)
router.post("/api/createTestimonials", TestimonialController.CreateTestimonials)
router.post("/api/createXTestimonials", TestimonialController.CreateXTestimonials)
router.post("/api/likeUnlikeTestimonials", TestimonialController.LikeUnlikeTestimonials)
router.get("/api/getLikedTestimonialsBySpaceId", TestimonialController.GetLikedTestimonialsBySpaceId)
// router.get('/getSpacesByUserId')
// router.get('/', res.send("Hello World!"));

router.get('/api/getApifyTweet', ApifyContoller.GetApifyTweet);


