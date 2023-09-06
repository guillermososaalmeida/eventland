const express = require("express");

const { postComment } = require("../controllers/Comment.controller");

const CommentRoutes = express.Router();

CommentRoutes.post("/", postComment);

module.exports = CommentRoutes;
