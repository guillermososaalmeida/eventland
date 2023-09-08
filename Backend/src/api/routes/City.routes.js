const { isAuthAdmin } = require("../../middleware/authUser.middleware");
const { uploadCity } = require("../../middleware/files.middleware");
const {
  postCity,
  getByNameCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getNextEvents,
  getPastEvents,
} = require("../controllers/City.controller");

const CityRoutes = require("express").Router();

//! POST
CityRoutes.post("/", uploadCity.single("image"), [isAuthAdmin], postCity);

//! GET
CityRoutes.get("/getbyname/:name", getByNameCity);
CityRoutes.get("/getallcities/", getAllCities);
CityRoutes.get("/getbyid/:id", getCityById);
CityRoutes.get("/get/next/events/:city", getNextEvents);
CityRoutes.get("/get/past/events/:city", getPastEvents);

//! PATCH
CityRoutes.patch(
  "/updatecity/:id",
  uploadCity.single("image"),
  [isAuthAdmin],
  updateCity,
);

//! DELETE
CityRoutes.delete("/", [isAuthAdmin], deleteCity);
module.exports = CityRoutes;
