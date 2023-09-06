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
} = require("../controllers/User.controller");

const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", uploadUser.single("image"), register);
UserRoutes.post("/resend", resendCode);
UserRoutes.patch("/forgotpassword/forgotpassword", forgotPassword);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.patch("/changepassword", [isAuthUser], modifyPassword);
UserRoutes.patch(
  "/update/update",
  [isAuthUser],
  uploadUser.single("image"),
  update,
);
//UserRoutes.delete('/', [isAuth], deleteUser);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/sendpassword/:id", sendPassword);

module.exports = UserRoutes;
