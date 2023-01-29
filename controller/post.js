import { Post } from "./../models/post.js";
import { isEmpty } from "./functions.js";

export const allPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
};

export const createPost = async (req, res) => {
  if (isEmpty(req.body)) {
    res.json({ warning: "Please enter full details." });
  }
  let images = [];
  if(req.files) {
    req.files.forEach((file) => {
      images.push(file.path);
    });
  }
  const { title, description } = req.body;
  const newPost = new Post({
    title,
    description,
    images,
    user: req.user.id,
  });
  const result = await newPost.save();
  if (result) {
    return res.json({success: 'Post Created Successfully.', newPost});
  }
  res.json({ error: "Something went wrong !!!" });
};

export const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate({ _id: req.post._id }, req.body, {
    new: true,
  });
  res.json({success: 'Post Successfully Updated.',post});
};


export const getPost = (req, res) => {
  return res.json(req.post);
}

export const getPostByUser =  async (req, res) => {
  const posts = await Post.find({user: req.user.id});
  return res.json(posts);
}

export const deletePost = async (req, res) => {
  if(await (await Post.deleteOne({_id: req.post._id})).acknowledged){
    return res.json({success: "Post Deleted Successfully."})
  }
  return res.json({error: 'something went wrong!!!'})

}