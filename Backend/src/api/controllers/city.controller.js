const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const City = require("../models/City.model");

const postCity = async (req, res, next) => {
  let cathCity = req.file?.path;
  try {
    await City.syncIndexes();

    const newCity = new City(req.body);
    //ponemos imagen por defecto si no hay una.
    if (req.file) {
      newCity.image = cathCity;
    } else {
      newCity.image =
        "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994443/proyectoEventland/cityStorage/defaultCity.jpg";
    }
    //guardamos el Citye en la bbdd
    const savedCity = await newCity.save();
    if (savedCity) {
      return res.status(200).json(savedCity);
    } else {
      return res
        .status(404)
        .json("No se ha podido guardar la ciudad en la bbdd");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(cathCity);
    return next(error);
  }
};

const getByNameCity = async (req, res, next) => {
  try {
    const { name = "" } = req.params;
    const cityByName = await City.find();
    const filterCity = cityByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterCity.length > 0) {
      return res.status(200).json({ data: cityByName });
    } else {
      return res.status(404).json("No se ha podido encontrar la ciudad");
    }
  } catch (error) {
    return next(error);
  }
};

const getAllCities = async (req, res, next) => {
  try {
    const allCities = await City.find();
    if (allCities.length > 0) {
      return res.status(200).json({ data: allCities });
    } else {
      return res.status(404).json("events not found");
    }
  } catch (error) {
    return next(error);
  }
};

const getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cityById = await City.findById(id);
    if (cityById) {
      return res.status(200).json({ data: cityById });
    } else {
      res.status(404).json("Ciudad no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { postCity, getByNameCity, getAllCities, getCityById };
