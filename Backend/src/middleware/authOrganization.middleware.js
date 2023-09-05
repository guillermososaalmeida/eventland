//? Aquí haremos la autentificación de organizaciones

const Organization = require("../api/models/organization");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuthOrganization = async (req, res, next) => {
  //le quitamos el prefijo Bearer al token
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("You're not an organization ❌"));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.organization = await Organization.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthOrganization,
};
