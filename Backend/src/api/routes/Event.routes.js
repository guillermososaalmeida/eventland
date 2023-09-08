const express = require("express");

const { uploadEvent } = require("../../middleware/files.middleware");
const {
  getAllEvents,
  getByName,
  getById,
  postEvent,
  updateEvent,
  getNextEvent,
} = require("../controllers/Event.controller");
const {
  isAuthOrganization,
} = require("../../middleware/authOrganization.middleware");

const EventRoutes = express.Router();

//! POST
EventRoutes.post(
  "/",
  uploadEvent.single("image"),
  [isAuthOrganization],
  postEvent,
);

//! GET
EventRoutes.get("/:id", getById);
EventRoutes.get("/getbyname/:name", getByName);
EventRoutes.get("/get/all", getAllEvents);
EventRoutes.get("/get/next/event", getNextEvent);

//! PATCH
EventRoutes.patch(
  "/update/:id",
  uploadEvent.single("image"),
  [isAuthOrganization],
  updateEvent,
);

//! DELETE

module.exports = EventRoutes;
