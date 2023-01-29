import express from "express";
import { allPosts, createPost, deletePost, getPost, getPostByUser, updatePost } from "../controller/post.js";
import { isSingedIn, isAunthenticated, isAdmin } from "../middlewares/auth.js";
import { getUserById } from "../middlewares/user.js";
import { getPostById } from "../middlewares/post.js";

const router = express.Router();

router.param("userId", getUserById);
router.param("postId", getPostById);

router.get("/", allPosts);

router.get("/:postId", getPost);

router.post("/createPost", isSingedIn, createPost);

router.put("/updatePost/:postId/:userId", isSingedIn, isAunthenticated, updatePost);

router.get('/all/:userId',  isSingedIn, isAunthenticated, getPostByUser);

router.delete('/delete/:postId/:userId', isSingedIn, isAunthenticated, deletePost);

export const postRouter = router;
