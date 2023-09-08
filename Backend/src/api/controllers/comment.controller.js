const Comment = require("../models/Comment.model");
const Event = require("../models/Event.model");
const Establishment = require("../models/Establishment.model");

//! CREATE COMMENT
const postComment = async (req, res, next) => {
  try {
    {
      try {
        await Comment.syncIndexes();

        const newComment = new Comment(req.body);
        const { _id } = newComment;
        const savedComment = await newComment.save();
        const eventId = req.params.event;
        const eventToComment = await Event.findById(eventId);
        if (savedComment) {
          savedComment.event = eventId;
          savedComment.cityOfEvent = eventToComment.city;
          savedComment.establishment = eventToComment.establishment;
          savedComment.user = req.user;
          await Event.findByIdAndUpdate(eventId, { $push: { comments: _id } });

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

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentById = await Comment.findById(id);

    if (commentById) {
      return res.status(200).json({
        data: await Comment.findById(id).populate(
          "cityOfEvent establishment user event",
        ),
      });
    } else {
      res.status(404).json("comment not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllComments = async (req, res, next) => {
  try {
    const allComments = await Comment.find();
    if (allComments.length > 0) {
      return res.status(200).json({ data: allComments });
    } else {
      return res.status(404).json("comments not found");
    }
  } catch (error) {
    return next(error);
  }
};

//!DELETE

const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (deletedComment) {
      // Eliminar la referencia en los eventos
      await Event.updateMany({ comments: id }, { $pull: { comments: id } });

      // Eliminar la referencia en los establecimientos
      await Establishment.updateMany(
        { comments: id },
        { $pull: { comments: id } },
      );

      return res
        .status(200)
        .json({ message: "Comentario eliminado exitosamente" });
    } else {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { postComment, getById, getAllComments, deleteComment };
