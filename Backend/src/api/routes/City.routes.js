const { isAuthAdmin } = require("../../middleware/authUser.middleware");
const { uploadCity } = require("../../middleware/files.middleware");
const {
  postCity,
  getByNameCity,
  getAllCities,
  getCityById,
  updateCity,
} = require("../controllers/City.controller");

const CityRoutes = require("express").Router();

//! POST
CityRoutes.post("/", uploadCity.single("image"), [isAuthAdmin], postCity);

//! GET
CityRoutes.get("/getbyname/:name", getByNameCity);
CityRoutes.get("/getallcities/", getAllCities);
CityRoutes.get("/getbyid/:id", getCityById);

//! PATCH
CityRoutes.patch(
  "/updatecity/:id",
  uploadCity.single("image"),
  [isAuthAdmin],
  updateCity,
);

//! DELETE

module.exports = CityRoutes;
