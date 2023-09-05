const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    name: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
      minlength: [8, "Min 8 characters"],
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros", "prefiero no decirlo"],
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    eventsInterested: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsAssist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    organizationsFav: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    ],
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
