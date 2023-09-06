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
} = require("../controllers/Organization.controller");

const express = require("express");
const OrganizationRoutes = express.Router();

OrganizationRoutes.post(
  "/register",
  uploadOrganization.single("image"),
  registerOrganization,
);
OrganizationRoutes.post("/resend", resendCode);
OrganizationRoutes.patch("/forgotpassword/forgotpassword", forgotPassword);
OrganizationRoutes.post("/login", login);
OrganizationRoutes.post("/login/autologin", autoLogin);
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
//UserRoutes.delete('/', [isAuth], deleteUser);
OrganizationRoutes.post("/check", checkNewOrganization);

OrganizationRoutes.patch("/sendpassword/:id", sendPassword);

module.exports = OrganizationRoutes;
