const { isAuthAdmin } = require("../../middleware/authUser.middleware");
const { uploadEstablishment } = require("../../middleware/files.middleware");
const {
  updateEstablishment,
  getEstablishmentById,
  getByNameEstablishment,
  getAllEstablishments,
  postEstablishment,
} = require("../controllers/Establishment.controller");

const EstablishmentRoutes = require("express").Router();

EstablishmentRoutes.post(
  "/",
  uploadEstablishment.single("image"),
  [isAuthAdmin],
  postEstablishment,
);
EstablishmentRoutes.get("/getbyname/:name", getByNameEstablishment);
EstablishmentRoutes.get("/getallestablishments/", getAllEstablishments);
EstablishmentRoutes.get("/getbyid/:id", getEstablishmentById);
EstablishmentRoutes.patch(
  "/updateestablishment/:id",
  uploadEstablishment.single("image"),
  [isAuthAdmin],
  updateEstablishment,
);

module.exports = EstablishmentRoutes;
