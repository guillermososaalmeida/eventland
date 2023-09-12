const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const {
  getTestEmailSend,
  setTestEmailSend,
} = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const { generateToken } = require("../../utils/token");
const setError = require("../../helpers/handle-error");
const randomPassword = require("../../utils/randomPassword");

const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Comment = require("../models/Comment.model");
const Organization = require("../models/Organization.model");

//!-------Register
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    let confirmationCode = randomCode();

    const { email, name } = req.body;

    const userExist = await User.findOne({ email: email }, { name: name });

    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });

      if (req.file) {
        newUser.image = catchImg;
      } else {
        newUser.image =
          "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994551/proyectoEventland/userAssets/istockphoto-1300845620-612x612_wf50h4.jpg";
      }
      console.log(req.body.dateOfBirth);
      try {
        const dateOfBirthUTC = new Date(req.body.dateOfBirth);
        dateOfBirthUTC.setHours(dateOfBirthUTC.getHours() + 2);
        newUser.dateOfBirth = dateOfBirthUTC;

        const userSave = await newUser.save();

        if (userSave) {
          const info = await sendEmail(email, name, confirmationCode);

          if (!info) setTestEmailSend(false);
          else if (info.accepted.length) setTestEmailSend(true);
          else setTestEmailSend(false);
          // setTimeout(() => {
          if (getTestEmailSend()) {
            setTestEmailSend(false);
            return res.status(200).json({ user: userSave, confirmationCode });
          } else {
            setTestEmailSend(false);
            return res.status(404).json({
              user: userSave,
              confirmationCode: "error, resend code",
            });
          }
          // }, 2000);
        } else {
          return res.status(404).json("not saved user1");
        }
      } catch (error) {
        return res
          .status(404)
          .json({ error: error, message: "error saving user" });
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);

    return next(error);
  }
};

//!------------------------------------CHECK CODECONFIRMATION USER NUEVO--------------

const checkNewUser = async (req, res, next) => {
  try {
    // nos traemos de la req.body el email y codigo de confirmation
    const { email, confirmationCode } = req.body;

    // hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email });
    if (!userExists) {
      //No existe----> 404 de no se encuentra
      return res.status(404).json("User not found");
    } else {
      // cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
      if (confirmationCode === userExists.confirmationCode) {
        // si coinciden los codigos hacemos la actualizacion de check
        try {
          await userExists.updateOne({ check: true });
          // hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
          const updateUser = await User.findOne({ email });

          // este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        /// En caso dec equivocarse con el codigo lo borramos de la base datos y lo mandamos al registro
        return res.status(404).json("invalid code");
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, "General error check code"));
  }
};

//!----------------RESERND CODE CONFRIMATION USER NUEVO
const resendCode = async (req, res, next) => {
  try {
    //! vamos a configurar nodemailer porque tenemos que enviar un codigo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `Tu código es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(404).json("Email not sent ❌");
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//!------------ LOGIN----------------------------------------

const login = async (req, res, next) => {
  try {
    // nos traemos
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      // comparamos la contrase del body con la del user de la DB
      if (bcrypt.compareSync(password, userDB.password)) {
        // si coinciden generamos el token
        const token = generateToken(userDB._id, email);
        // mandamos la respuesta con el token
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!----------------AUTOLOGIN---------------------------------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (password == userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -------------- CONTRASEÑA OLVIDADA

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne({ email });
    if (userDb) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/sendPassword/${userDb._id}`,
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);
    // configuramos el transporte de nodemailer
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Generamos la password secura con la funcion randomPassword
    let passwordSecure = randomPassword();
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      text: `${userDb.name}.Tu nueva contraseña es ${passwordSecure} . Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };

    // enviamos el email
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        // si hay error quiere decir que ni hemos actualizado el user, ni enviamos email
        return res.status(404).json("email not sent and user not updated");
      } else {
        console.log("Email sent: " + info.response);
        // ----> si hemos enviado el correo, hasheamos la contraseña y actualizamos el user
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);
        try {
          // actualizamos la contraseña en el back
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
          const userUpdatePassword = await User.findById(id);
          /// comprobamos que se haya actualizado correctamente
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            // si no se ha actualizado damos feedback de que se envio la contraseña pero no se actualizó
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//!------------MODIFICAR CONTRASEÑA DESPUÉS DE LOGGEARSE-------

const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    const validated = validator.isStrongPassword(newPassword);

    if (validated) {
      if (bcrypt.compareSync(password, req.user.password)) {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          /// hacemos la actualizacion si las contraseñas coinciden
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

          /// hacemos una comprobacion para ver si se ha actualizado las contraseñas
          const userUpdate = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            return res.status(200).json({
              updateUser: true,
            });
          } else {
            return res.status(200).json({
              updateUser: false,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("new password is not strong enough");
    }
  } catch (error) {
    return next(error);
  }
};

//!----------ACTUALIZAR INFO USUARIO------------

const update = async (req, res, next) => {
  // guardamos la imagen para si luego hay un error utilizar la URL para borrarla
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    // creamos una nueva instancia del modelo User con el req.body
    const patchUser = new User(req.body);
    // si tiene archivo la request entonces le metemos al usuario creado esa imagen
    if (req.file) {
      patchUser.image = req.file.path;
    }
    // importante quedarnos con el id del usuario antes de actualizarse
    patchUser._id = req.user._id;
    // LA CONTRASEÑA NO SE PUEDE MODIFICAR: ponemos la contraseña de la db
    patchUser.password = req.user.password;
    // Lo mismo con el rol, confirmationCode, check, NO SE PUEDE MODIFICAR POR AQUI
    patchUser.role = req.user.role;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.email = req.user.email;

    // Ahora cogemos y actualizamos el usuario

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) {
        deleteImgCloudinary(req.user.image);
      }
      const updateUser = await User.findById(req.user._id);
      // nos traemos del objeto del body sus claves
      const updateKeys = Object.keys(req.body);
      /// -----> venerar un array con los resultados del test en el runtime
      const testUpdate = [];

      // recorremos el objeto con las claves y comprobamos si los valores del back coinciden
      updateKeys.forEach((item) => {
        // si coinciden pushamos un objeto con el nombre del item y un true
        if (updateUser[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });

          // si no coinciden pushamos un objeto con el nombre del item y un true
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      // lo mismo que arriba pero ahora con el req.file en caso de haberlo recibido
      if (req.file) {
        updateUser.image == req.file.path
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }
      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    // siempre que tengamos un error debemos borrar la imagen nueva subida a cloudinary
    if (req.file) {
      deleteImgCloudinary(catchImg);
    }
    return next(error);
  }
};

//!--------------------------DELETE------------------
const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    try {
      await Comment.updateMany({ user: _id }, { $pull: { user: _id } });
      try {
        await Event.updateMany(
          { usersAttend: _id },
          { $pull: { usersAttend: _id } },
        );
        try {
          await Event.updateMany(
            { favsFromUsers: _id },
            { $pull: { favsFromUsers: _id } },
          );
          try {
            await Organization.updateMany(
              { usersFav: _id },
              { $pull: { usersFav: _id } },
            );
          } catch (error) {
            return res
              .status(400)
              .json(
                "error borrando el user a causa del modelo de Organization",
              );
          }
        } catch (error) {
          return res
            .status(400)
            .json(
              "error borrando el user a causa del modelo de Event(favsFromUser)",
            );
        }
      } catch (error) {
        return res
          .status(400)
          .json(
            "error borrando el user a causa del modelo de Event(usersAttend)",
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json("error borrando el user a causa del modelo de Comment");
    }
    //
    if (await User.findById(_id)) {
      return res.status(404).json("Dont delete");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("ok delete");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);

    if (userById) {
      return res.status(200).json({
        data: await User.findById(id).populate(
          "eventsInterested eventsAttend organizationsFav city",
        ),
      });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name = "" } = req.params;
    const userByName = await User.find();
    const filterUser = userByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterUser.length > 0) {
      return res.status(200).json({ data: filterUser });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      return res.status(200).json({ data: allUsers });
    } else {
      return res.status(404).json("users not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! ATTEND EVENT

const toggleAttendEvent = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const eventToAttend = req.params.event;

    if (req.user.eventsAttend.includes(eventToAttend)) {
      // si lo incluye lo sacamos
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { eventsAttend: eventToAttend },
        });

        try {
          await Event.findByIdAndUpdate(eventToAttend, {
            $pull: { usersAttend: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pulling user from event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pulling event from user model",
          message: error.message,
        });
      }
    } else {
      // si no lo incluye lo metemos
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { eventsAttend: eventToAttend },
        });
        try {
          await Event.findByIdAndUpdate(eventToAttend, {
            $push: { usersAttend: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pushing user  in event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pushing event in user model",
          message: error.message,
        });
      }
    }

    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("eventsAttend"));
    }, 1000);
  } catch (error) {
    return next(error);
  }
};

//! LIKE EVENT

const toggleLikedEvent = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const eventToLike = req.params.event;

    if (req.user.eventsInterested.includes(eventToLike)) {
      // si lo incluye lo sacamos
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { eventsInterested: eventToLike },
        });

        try {
          await Event.findByIdAndUpdate(eventToLike, {
            $pull: { favsFromUsers: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pulling user from event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pulling event from user model",
          message: error.message,
        });
      }
    } else {
      // si no lo incluye lo metemos
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { eventsInterested: eventToLike },
        });
        try {
          await Event.findByIdAndUpdate(eventToLike, {
            $push: { favsFromUsers: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pushing user  in event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pushing event in user model",
          message: error.message,
        });
      }
    }

    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("eventsInterested"));
    }, 1000);
  } catch (error) {
    return next(error);
  }
};

//! ADD FAVORITE ORGANIZATION

const toggleFavOrganization = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { organization } = req.params;

    if (req.user.organizationsFav.includes(organization)) {
      // si lo incluye lo sacamos
      try {
        await User.findByIdAndUpdate(_id, {
          $pull: { organizationsFav: organization },
        });

        try {
          await Organization.findByIdAndUpdate(organization, {
            $pull: { usersFav: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pulling user from event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pulling event from user model",
          message: error.message,
        });
      }
    } else {
      // si no lo incluye lo metemos
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { organizationsFav: organization },
        });
        try {
          await Organization.findByIdAndUpdate(organization, {
            $push: { usersFav: _id },
          });
        } catch (error) {
          return res.status(404).json({
            error: "error pushing user  in event model",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error pushing event in user model",
          message: error.message,
        });
      }
    }

    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("organizationsFav"));
    }, 1000);
  } catch (error) {
    return next(error);
  }
};

//! GET PAST EVENTS

const getPastEvents = async (req, res, next) => {
  try {
    //si hay eventos en el campo de eventsAttend
    if (req.user.eventsAttend?.length > 0) {
      //guardo los ids de eventos de eventsAttend
      const events = req.user.eventsAttend;
      //guardo la fecha actual
      const currentDate = new Date();
      //creo un array donde pushearé los eventos que cumplan la condición (eventos anteriores a fecha actual)
      const arrayPastEvents = [];
      //con el promise.all esperamos a que se cumplan las promesas de este iterable(map)
      await Promise.all(
        events.map(async (event) => {
          //por cada id de evento, lo busco con el método de Mongo
          const currentEvent = await Event.findById(event);
          //si es anterior (menor) lo pusheo al array
          currentEvent.date < currentDate && arrayPastEvents.push(currentEvent);
        }),
      );
      return res.status(200).json({ data: arrayPastEvents });
    } else {
      return res.status(404).json("there's no events yet!");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET NEXT EVENTS
//mirar comentarios del anterior controlador
const getNextEvents = async (req, res, next) => {
  try {
    if (req.user.eventsAttend?.length > 0) {
      const events = req.user.eventsAttend;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            //el único cambio es la condición, que buscamos que la fecha del evento sea posterior (mayor)
            currentEvent.date > currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      return res.status(200).json({ data: arrayNextEvents });
    } else {
      return res.status(404).json("there's no events yet!");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET JUST THE NEXT EVENT
//mirar comentarios del anterior controlador
const getSingleNextEvent = async (req, res, next) => {
  try {
    if (req.user.eventsAttend?.length > 0) {
      const events = req.user.eventsAttend;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            //el único cambio es la condición, que buscamos que la fecha del evento sea posterior (mayor)
            currentEvent.date > currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      const nextEvent = arrayNextEvents.sort((a, b) => a.date - b.date);
      return res.status(200).json({ data: nextEvent[0] });
    } else {
      return res.status(404).json("there's no events yet!");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  autoLogin,
  register,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  checkNewUser,
  getAllUsers,
  getByName,
  getById,
  toggleAttendEvent,
  toggleFavOrganization,
  toggleLikedEvent,
  getPastEvents,
  getNextEvents,
  getSingleNextEvent,
};
