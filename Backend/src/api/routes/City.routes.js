const { isAuthAdmin } = require("../../middleware/authUser.middleware");
const { uploadCity } = require("../../middleware/files.middleware");
const {
  postCity,
  getByNameCity,
  getAllCities,
  getCityById,
} = require("../controllers/City.controller");

const CityRoutes = require("express").Router();

CityRoutes.post("/", uploadCity.single("image"), [isAuthAdmin], postCity);
CityRoutes.get("/getByName/:name", getByNameCity);
CityRoutes.get("/getAllCities/", getAllCities);
CityRoutes.get("/getById/:id", getCityById);

module.exports = CityRoutes;
