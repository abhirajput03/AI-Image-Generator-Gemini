import { Router } from "express";
import { createPost, generatePost, getAllPosts, getMyPosts, getPostByUser, removePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate-post", generatePost)
router.post("/create-post", verifyJWT, createPost)
router.get("/get-all-posts", getAllPosts)
router.get("/get-my-posts", verifyJWT, getMyPosts)
router.get("/get-postsBy-user/:id", verifyJWT, getPostByUser)
router.get("/remove-post/:id", verifyJWT, removePost)

export default router;