const express = require("express");

const { uploadEvent } = require("../../middleware/files.middleware");
const {
  getAllEvents,
  getByName,
  getById,
  postEvent,
} = require("../controllers/Event.controller");

const EventRoutes = express.Router();

EventRoutes.post("/", uploadEvent.single("image"), postEvent); //luego poner la authOrganization
EventRoutes.get("/:id", getById);
EventRoutes.get("/getByName", getByName);
EventRoutes.get("/get/all", getAllEvents);

module.exports = EventRoutes;
