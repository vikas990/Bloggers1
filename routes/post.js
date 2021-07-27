const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/mongoose");
const User = require("../models/user");
const Posts = require("../models/post");

// CREATE POST
router.post("/sendPost", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/updatePost/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        const updatePost = await Posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/deletePost/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted!!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can Delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/getPost/:id", async (req, res) => {
  try {
    const posts = await Posts.findById(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POST
router.get("/getAllPost", async (req, res) => {
  const username = req.query.user;

  try {
    let posts;
    if (username) {
      posts = await Posts.find({ username });
    } else {
      posts = await Posts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
