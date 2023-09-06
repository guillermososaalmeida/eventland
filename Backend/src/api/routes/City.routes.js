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

CityRoutes.post("/", uploadCity.single("image"), [isAuthAdmin], postCity);
CityRoutes.get("/getbyname/:name", getByNameCity);
CityRoutes.get("/getallcities/", getAllCities);
CityRoutes.get("/getbyid/:id", getCityById);
CityRoutes.patch(
  "/updatecity/:id",
  uploadCity.single("image"),
  [isAuthAdmin],
  updateCity,
);

module.exports = CityRoutes;
