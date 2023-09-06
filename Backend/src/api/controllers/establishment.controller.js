const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Establishment = require("../models/City.model");

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
    const savedCity = await newEstablishment.save();
    if (savedCity) {
      return res.status(200).json(savedCity);
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

const getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cityById = await City.findById(id);
    if (cityById) {
      return res.status(200).json({ data: cityById });
    } else {
      res.status(404).json("city not found");
    }
  } catch (error) {
    return next(error);
  }
};

// const updateCity = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const city = await City.findById(req.params.id);
//     console.log("cityById", city);
//     console.log("id", id);
//     if (city) {
//       const customBody = {
//         _id: city._id,
//         image: req.file?.path ? req.file?.path : city.image,
//         name: req.body?.name ? req.body?.name : city.name,
//         country: req.body?.country ? req.body?.country : city.country,
//         province: req.body?.province ? req.body?.province : city.province,
//         community: req.body?.community ? req.body?.community : city.community,
//       };
//       await City.findByIdAndUpdate(id, customBody);
//       if (req.file?.path) {
//         deleteImgCloudinary(city.image);
//       }

//       const updateNewCity = await City.findById(id);
//       const elementUpdate = Object.keys(req.body);
//       let test = {};
//       elementUpdate.forEach((item) => {
//         if (req.body[item] == updateNewCity[item]) {
//           test[item] = true;
//         } else {
//           test[item] = false;
//         }
//         if (req.file) {
//           updateNewCity.image == req.file?.path
//             ? (test = { ...test, file: true })
//             : (test = { ...test, file: false });
//         }
//       });
//       let acc = 0;
//       for (let clave in test) {
//         if (test[clave] == false) acc++;
//       }

//       if (acc > 0) {
//         return res.status(404).json({
//           dataTest: test,
//           update: false,
//         });
//       } else {
//         return res.status(200).json({
//           dataTest: test,
//           update: updateNewCity,
//         });
//       }
//     } else {
//       return res.status(404).json("City not found");
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = {};
