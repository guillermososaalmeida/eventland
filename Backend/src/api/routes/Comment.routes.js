const express = require("express");

const {
  postComment,
  getById,
  getAllComments,
} = require("../controllers/Comment.controller");

const CommentRoutes = express.Router();

//! POST
CommentRoutes.post("/", postComment);

//! GET
CommentRoutes.get("/:id", getById);
CommentRoutes.get("/get/all", getAllComments);

//! DELETE

module.exports = CommentRoutes;
