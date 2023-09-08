const { isAuthAdmin } = require("../../middleware/authUser.middleware");
const { uploadEstablishment } = require("../../middleware/files.middleware");
const {
  updateEstablishment,
  getEstablishmentById,
  getByNameEstablishment,
  getAllEstablishments,
  postEstablishment,
  deleteEstablishment,
} = require("../controllers/Establishment.controller");

const EstablishmentRoutes = require("express").Router();

//! POST
EstablishmentRoutes.post(
  "/",
  uploadEstablishment.single("image"),
  [isAuthAdmin],
  postEstablishment,
);

//! GET
EstablishmentRoutes.get("/getbyname/:name", getByNameEstablishment);
EstablishmentRoutes.get("/getallestablishments/", getAllEstablishments);
EstablishmentRoutes.get("/getbyid/:id", getEstablishmentById);

//! PATCH
EstablishmentRoutes.patch(
  "/updateestablishment/:id",
  uploadEstablishment.single("image"),
  [isAuthAdmin],
  updateEstablishment,
);

//! DELETE

EstablishmentRoutes.delete("/:id", [isAuthAdmin], deleteEstablishment);
module.exports = EstablishmentRoutes;
