const express = require("express");

const { createPost, getPosts } = require("../controllers/post");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createPost);

router.get("/", getPosts);

module.exports = router;