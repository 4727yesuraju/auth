import express from 'express';
import { commentToPosts, createPost, deletePost, getAllPosts, getPost, getUserPosts, likeUnlikePost, updatePost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectedRoute.js';

const router = express.Router();


router.get("/user/:username", getUserPosts);
router.get("/getall", getAllPosts);
router.get("/getpost/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.put("/update/:id", protectRoute, updatePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/comment/:id", protectRoute, commentToPosts);


export default router;