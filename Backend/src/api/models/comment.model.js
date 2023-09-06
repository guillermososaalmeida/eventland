const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    eventName: { type: String, required: true },
    cityOfEvent: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    userImage: { type: String, required: false },
    establishment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establishment",
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    review: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
