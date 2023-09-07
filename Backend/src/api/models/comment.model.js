const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    cityOfEvent: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    establishment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establishment",
      },
    ],
    //!El user y el event se rellena automáticamente cuando posteamos el comentario
    //!cogiendo los datos de los models correspondientes.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    score: { type: Number, required: true },
    review: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
