const router = require("express").Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers.js");

router
  .get("/", getAllPosts)
  .get("/:id", getPostById)
  .post("/", createPost)
  .put("/:id", updatePost)
  .delete("/:id", deletePost);

module.exports = router;
