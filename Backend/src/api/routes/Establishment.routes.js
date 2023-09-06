const { uploadEstablishment } = require("../../middleware/files.middleware");
const {
  updateEstablishment,
  getEstablishmentById,
  getByNameEstablishment,
  getAllEstablishments,
  postEstablishment,
} = require("../controllers/Establishment.controller");

const EstablishmentRoutes = require("express").Router();

//!-----------------AUTORIZACIONES???????????
//!-----------------AUTORIZACIONES???????????
//!-----------------AUTORIZACIONES???????????
//!-----------------AUTORIZACIONES???????????

EstablishmentRoutes.post(
  "/",
  uploadEstablishment.single("image"),
  postEstablishment,
);
EstablishmentRoutes.get("/getbyname/:name", getByNameEstablishment);
EstablishmentRoutes.get("/getallestablishments/", getAllEstablishments);
EstablishmentRoutes.get("/getbyid/:id", getEstablishmentById);
EstablishmentRoutes.patch(
  "/updateestablishment/:id",
  uploadEstablishment.single("image"),
  updateEstablishment,
);

module.exports = EstablishmentRoutes;
