const express = require("express");

const {
  postComment,
  getById,
  getAllComments,
  deleteComment,
} = require("../controllers/Comment.controller");
const { isAuthUser } = require("../../middleware/authUser.middleware");

const CommentRoutes = express.Router();

//! POST
CommentRoutes.post("/:event", [isAuthUser], postComment);

//! GET
CommentRoutes.get("/:id", getById);
CommentRoutes.get("/get/all", getAllComments);

//! DELETE
CommentRoutes.delete("/:id", [isAuthUser], deleteComment);
module.exports = CommentRoutes;
