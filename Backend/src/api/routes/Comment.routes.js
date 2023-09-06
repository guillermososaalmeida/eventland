const express = require("express");

const {
  postComment,
  getById,
  getAllComments,
} = require("../controllers/Comment.controller");

const CommentRoutes = express.Router();

CommentRoutes.post("/", postComment);
CommentRoutes.get("/:id", getById);
CommentRoutes.get("/get/all", getAllComments);

module.exports = CommentRoutes;
