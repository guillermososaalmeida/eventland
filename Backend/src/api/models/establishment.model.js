const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const EstablishmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    capacity: { type: Number, required: false },
    kindOfPlace: { type: String, required: false },
    hours: { type: String, required: false },
    year: { type: Number, required: false },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    contact: {
      type: Number,
      required: false,
    },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  {
    timestamps: true,
  },
);

const Establishment = mongoose.model("Establishment", EstablishmentSchema);

module.exports = Establishment;
