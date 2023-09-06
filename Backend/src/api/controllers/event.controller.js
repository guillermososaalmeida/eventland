const { deleteImgCloudinary } = require("../../middleware/files.middleware");

const dotenv = require("dotenv");
dotenv.config();

const Event = require("../models/Event.model");
/* const User = require("../models/User.model"); */

//! CREATE EVENT
const postEvent = async (req, res, next) => {
  let catchImage = req.file?.path;

  try {
    {
      try {
        await Event.syncIndexes();

        const newEvent = new Event(req.body);

        if (req.file) {
          newEvent.image = catchImage;
        } else {
          newEvent.image =
            "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994796/proyectoEventland/eventAssets/istockphoto-1288712636-612x612_ttei8s.jpg";
        }

        const savedEvent = await newEvent.save();

        if (savedEvent) {
          return res.status(200).json(savedEvent);
        } else {
          return res.status(404).json("Event not saved in database");
        }
      } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImage);
        return next(error);
      }
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "user not found", message: error.message });
  }
};

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventById = await Event.findById(id);

    if (eventById) {
      return res.status(200).json({
        data: await Event.findById(id)
          .populate("usersAssist")
          .populate("city")
          .populate("establishment")
          .populate("organization")
          .populate("comments")
          .populate("favsFromUsers"),
      });
    } else {
      res.status(404).json("event not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name = "" } = req.query;
    const eventByName = await Event.find();
    const filterEvent = eventByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterEvent.length > 0) {
      return res.status(200).json({ data: filterEvent });
    } else {
      res.status(404).json("event not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    if (allEvents.length > 0) {
      return res.status(200).json({ data: allEvents });
    } else {
      return res.status(404).json("events not found");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllEvents,
  getByName,
  getById,
  postEvent,
};
