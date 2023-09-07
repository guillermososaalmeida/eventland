const { isAuthUser } = require("../../middleware/authUser.middleware");
const { uploadUser } = require("../../middleware/files.middleware");
const {
  autoLogin,
  register,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  checkNewUser,
  getAllUsers,
  getByName,
  getById,
  toggleAssistEvent,
} = require("../controllers/User.controller");

const express = require("express");
const UserRoutes = express.Router();

//! POST
UserRoutes.post("/register", uploadUser.single("image"), register);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.post("/check", checkNewUser);

//! PATCH
UserRoutes.patch("/forgotpassword/forgotpassword", forgotPassword);
UserRoutes.patch("/changepassword", [isAuthUser], modifyPassword);
UserRoutes.patch(
  "/update/update",
  [isAuthUser],
  uploadUser.single("image"),
  update,
);
UserRoutes.patch("/sendpassword/:id", sendPassword);
UserRoutes.patch("/add/:event", [isAuthUser], toggleAssistEvent);

//! DELETE
//UserRoutes.delete('/', [isAuth], deleteUser);

//! GET
UserRoutes.get("/:id", getById);
UserRoutes.get("/getbyname/:name", getByName);
UserRoutes.get("/get/all", getAllUsers);

module.exports = UserRoutes;
