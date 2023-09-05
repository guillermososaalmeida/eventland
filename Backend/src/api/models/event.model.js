const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    usersAssist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Establishment",
    },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    favsFromUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    video: { type: String, required: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
