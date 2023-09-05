const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    eventName: { type: String, required: true },
    cityOfEvent: { type: String, required: false },
    userImage: { type: String, required: false },
    establishment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establishment",
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
