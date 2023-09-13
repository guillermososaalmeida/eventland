//? Aquí haremos la autentificación de organizaciones

//const User = require("../api/models/User.model");
const Organization = require("../api/models/Organization.model");
const User = require("../api/models/User.model");
/* const Event = require("../api/models/Event.model");
 */ const { verifyToken } = require("../utils/token");
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
    req.user = await User?.findById(decoded.id);
    req.organization = await Organization?.findById(decoded.id);
    if (!req.organization && req.user?.role !== "admin") {
      return next(
        new Error("You need to be Admin or Organization for this ❌"),
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthOrganizationDeleteOrUpdate = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log("token 👀", req);

  if (!token) {
    return next(new Error("You're not an organization ❌"));
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User?.findById(decoded.id);
    req.organization = await Organization?.findById(decoded.id);
    console.log(req.user, req.organization);
    if (!req.organization && req.user?.role !== "admin") {
      return next(
        new Error("You need to be Admin or Organization for this ❌"),
      );
    }
    /* if (req.organization) {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      console.log("event 👀", event, eventId);
      if (!event || !event.organization.equals(decoded.id)) {
        return next(new Error("You're not the owner of event ❌"));
      }
    } */
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthOrganizationDeleteOrUpdate,
  isAuthOrganization,
};
