const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    usersAttend: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //!La ciudad se rellena automáticamente cuando seleccionamos el establecimiento
    //!cogiendo la ciudad del establecimiento para que haya consistencia de datos.
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Establishment",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    favsFromUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    video: { type: String, required: false },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
