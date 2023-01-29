import { Post } from "../models/post.js";

export const getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    post.createdAt = undefined;
    post.updatedAt = undefined;
    req.post = post;
    next();
  } catch (err) {
    return res.json({ error: "Failed To get Post !!!" });
  }
};
