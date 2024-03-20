import express from 'express';
import { commentToPosts, createPost, deletePost, getAllPosts, getPost, getUserPosts, likeUnlikePost, updatePost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectedRoute.js';

const router = express.Router();

//not need authentication
router.get("/getall", getAllPosts);
router.get("/getpost/:id", getPost);

//need authentication
router.get("/user/:username",protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.put("/update/:id", protectRoute, updatePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/comment/:id", protectRoute, commentToPosts);


export default router;