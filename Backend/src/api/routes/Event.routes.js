const express = require("express");

const { uploadEvent } = require("../../middleware/files.middleware");
const {
  getAllEvents,
  getByName,
  getById,
  postEvent,
  updateEvent,
} = require("../controllers/Event.controller");
const {
  isAuthOrganization,
} = require("../../middleware/authOrganization.middleware");

const EventRoutes = express.Router();

EventRoutes.post(
  "/",
  uploadEvent.single("image"),
  [isAuthOrganization],
  postEvent,
); //luego poner la authOrganization
EventRoutes.get("/:id", getById);
EventRoutes.get("/getbyname/:name", getByName);
EventRoutes.get("/get/all", getAllEvents);
EventRoutes.patch(
  "/update/:id",
  uploadEvent.single("image"),
  [isAuthOrganization],
  updateEvent,
);

module.exports = EventRoutes;
