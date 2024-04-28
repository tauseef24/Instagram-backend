const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth.js");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getOnePost,
  getUserPosts,
} = require("../controllers/postAuth.js");
const { likePost } = require("../controllers/likes.js");

const verifyToken = require("../middlewares/authJWT.js");

router.post("/register", signup);

router.post("/login", signin);

router.post("/protectedContent", verifyToken, (req, res) => {
  res.send("Authorized");
});

router.post("/createPost", verifyToken, createPost);

router.get("/users/:uid", verifyToken, getUserPosts);

router.get("/posts/:id", verifyToken, getOnePost);

router.put("/posts/:id", verifyToken, updatePost);

router.post("/posts/:id/like", verifyToken, likePost);

router.delete("/posts/:id", verifyToken, deletePost);

router.get("/posts", verifyToken, getPost);

module.exports = router;
