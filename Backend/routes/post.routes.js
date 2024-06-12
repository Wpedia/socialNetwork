import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { createPost, deletePost, getPost } from "../controllers/post.controller.js";

const router = express.Router()

router.post("/", protectRoute, createPost)
router.get("/:postId", protectRoute, getPost)
router.delete('/:postId', protectRoute, deletePost);
export default router