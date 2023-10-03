const mongoose = require("mongoose");
const Post = require("../models/PostModel.js");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id");
    }
    const post = await Post.findById(_id);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).send("No post with that id");
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    const saved = await newPost.save();
    if (saved) {
      return res.status(201).json(newPost);
    } else {
      return res.status(409).json({ message: "problems saving psot" });
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  if (!updatedPost) {
    return res.status(404).send("No post with that id");
  }
  return res.status(200).json(updatedPost);
};

exports.deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id");
    }
    const deleted = await Post.findByIdAndRemove(_id);
    if (!deleted) {
      return res.status(404).send("No post with that id");
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(404).send("No post with that id");
  }
};
