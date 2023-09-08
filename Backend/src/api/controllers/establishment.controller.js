const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Establishment = require("../models/Establishment.model");
const Event = require("../models/Event.model");

const postEstablishment = async (req, res, next) => {
  let catchEstablishment = req.file?.path;
  try {
    await Establishment.syncIndexes();

    const newEstablishment = new Establishment(req.body);
    if (req.file) {
      newEstablishment.image = catchEstablishment;
    } else {
      newEstablishment.image =
        "https://res.cloudinary.com/dhr13yihn/image/upload/v1694009594/proyectoEventland/establishmentAssets/EstablishmentDefault.jpg";
    }
    const savedEstablishment = await newEstablishment.save();
    if (savedEstablishment) {
      return res.status(200).json(savedEstablishment);
    } else {
      return res.status(404).json("Couldn't save the establishment in the DB");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchEstablishment);
    return next(error);
  }
};

const getByNameEstablishment = async (req, res, next) => {
  try {
    const { name = "" } = req.params;
    const establishmentByName = await Establishment.find();
    const filterEstablishment = establishmentByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterEstablishment.length > 0) {
      return res.status(200).json({ data: establishmentByName });
    } else {
      return res.status(404).json("Couldn't find the establishment");
    }
  } catch (error) {
    return next(error);
  }
};

const getAllEstablishments = async (req, res, next) => {
  try {
    const allEstablishments = await Establishment.find();
    if (allEstablishments.length > 0) {
      return res.status(200).json({ data: allEstablishments });
    } else {
      return res.status(404).json("establishments not found");
    }
  } catch (error) {
    return next(error);
  }
};

const getEstablishmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const establishmentById = await Establishment.findById(id);
    if (establishmentById) {
      return res.status(200).json({ data: establishmentById });
    } else {
      res.status(404).json("establishment not found");
    }
  } catch (error) {
    return next(error);
  }
};

const updateEstablishment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const establishment = await Establishment.findById(req.params.id);
    if (establishment) {
      const customBody = {
        _id: establishment._id,
        image: req.file?.path ? req.file?.path : establishment.image,
        name: req.body?.name ? req.body?.name : establishment.name,
        description: req.body?.description
          ? req.body?.description
          : establishment.description,
        capacity: req.body?.capacity
          ? req.body?.capacity
          : establishment.capacity,
        kindOfPlace: req.body?.kindOfPlace
          ? req.body?.kindOfPlace
          : establishment.kindOfPlace,
        hours: req.body?.hours ? req.body?.hours : establishment.hours,
        year: req.body?.year ? req.body?.year : establishment.year,
        email: req.body?.email ? req.body?.email : establishment.email,
        contact: req.body?.contact ? req.body?.contact : establishment.contact,
      };

      await Establishment.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(establishment.image);
      }

      const updateNewEstablishment = await Establishment.findById(id);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewEstablishment[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }
        if (req.file) {
          updateNewEstablishment.image == req.file?.path
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }
      });
      let acc = 0;
      for (let clave in test) {
        if (test[clave] == false) acc++;
      }

      if (acc > 0) {
        return res.status(404).json({
          dataTest: test,
          update: false,
        });
      } else {
        return res.status(200).json({
          dataTest: test,
          update: updateNewEstablishment,
        });
      }
    } else {
      return res.status(404).json("Establishment not found");
    }
  } catch (error) {
    return next(error);
  }
};

//!DELETE

const deleteEstablishment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEstablishment = await Establishment.findByIdAndDelete(id);

    if (deletedEstablishment) {
      // Eliminar la referencia en los eventos
      await Event.updateMany(
        { establishment: id },
        { $pull: { establishment: id } },
      );

      return res
        .status(200)
        .json({ message: "Establecimiento eliminado exitosamente" });
    } else {
      return res.status(404).json({ error: "Establecimiento no encontrado" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  updateEstablishment,
  getEstablishmentById,
  getByNameEstablishment,
  getAllEstablishments,
  postEstablishment,
  deleteEstablishment,
};
