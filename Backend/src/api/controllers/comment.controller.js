const Comment = require("../models/Comment.model");

//! CREATE COMMENT
const postComment = async (req, res, next) => {
  try {
    {
      try {
        await Comment.syncIndexes();

        const newComment = new Comment(req.body);

        const savedComment = await newComment.save();

        if (savedComment) {
          return res.status(200).json(savedComment);
        } else {
          return res.status(404).json("Comment not saved in database");
        }
      } catch (error) {
        return next(error);
      }
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "user not found", message: error.message });
  }
};

module.exports = { postComment };
