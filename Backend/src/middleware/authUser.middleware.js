//? Aquí haremos la autentificación de usuarios y usuarios-Administradores

const User = require("../api/models/user.model");
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
    if (req.user.rol !== "admin") {
      return next(new Error("You need to be Admin for this ❌"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthUser,
  isAuthAdmin,
};
