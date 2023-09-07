//? Aquí haremos la autentificación de organizaciones

//const User = require("../api/models/User.model");
const Organization = require("../api/models/Organization.model");
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
    //?Lo comentado está para cuando queramos hacer que los admins
    //?puedan incluirse en esta restricción de acceso.
    // req.user = await User?.findById(decoded.id);
    req.organization = await Organization?.findById(decoded.id);
    // if (req.user?.role === "user") {
    //   return next(
    //     new Error("You need to be Admin or Organization for this ❌"),
    //   );
    // }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthOrganization,
};
