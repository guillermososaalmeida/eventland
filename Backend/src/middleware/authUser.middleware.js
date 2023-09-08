//? Aquí haremos la autentificación de usuarios y usuarios-Administradores

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuthUser = async (req, res, next) => {
  //le quitamos el prefijo Bearer al token
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("You're not authorized ❌"));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("You're not authorized as Admin ❌"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "admin") {
      return next(new Error("You need to be Admin for this ❌"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthUserOrAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new Error("You're not authorized ❌"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error("User not found ❌"));
    }

    if (user.role !== "user" && user.role !== "admin") {
      return next(new Error("Invalid role for this operation ❌"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthUser,
  isAuthAdmin,
  isAuthUserOrAdmin,
};
