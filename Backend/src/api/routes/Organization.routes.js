const {
  isAuthOrganization,
} = require("../../middleware/authOrganization.middleware");
const { uploadOrganization } = require("../../middleware/files.middleware");
const {
  registerOrganization,
  checkNewOrganization,
  resendCode,
  login,
  autoLogin,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  getById,
  getByName,
  getAllOrganizations,
  deleteOrganization,
} = require("../controllers/Organization.controller");

const express = require("express");
const OrganizationRoutes = express.Router();

//! POST
OrganizationRoutes.post(
  "/register",
  uploadOrganization.single("image"),
  registerOrganization,
);
OrganizationRoutes.post("/resend", resendCode);
OrganizationRoutes.post("/login", login);
OrganizationRoutes.post("/login/autologin", autoLogin);
OrganizationRoutes.post("/check", checkNewOrganization);

//! PATCH
OrganizationRoutes.patch("/forgotpassword/forgotpassword", forgotPassword);
OrganizationRoutes.patch(
  "/changepassword",
  [isAuthOrganization],
  modifyPassword,
);
OrganizationRoutes.patch(
  "/update/update",
  [isAuthOrganization],
  uploadOrganization.single("image"),
  update,
);
OrganizationRoutes.patch("/sendpassword/:id", sendPassword);

//! DELETE
OrganizationRoutes.delete("/", [isAuthOrganization], deleteOrganization);

//! GET
OrganizationRoutes.get("/:id", getById);
OrganizationRoutes.get("/name/:name", getByName);
OrganizationRoutes.get("/get/all", getAllOrganizations);

module.exports = OrganizationRoutes;
