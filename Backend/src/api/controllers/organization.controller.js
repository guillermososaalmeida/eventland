const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require("dotenv");
dotenv.config();

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

const Organization = require("../models/Organization.model");
const City = require("../models/City.model");
const User = require("../models/User.model");
const Event = require("../models/Event.model");

//! REGISTER ORGANIZATION

const registerOrganization = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Organization.syncIndexes();

    let confirmationCode = randomCode();

    const { email, name } = req.body;

    const organizationExist = await Organization.findOne(
      { email: email },
      { name: name },
    );

    if (!organizationExist) {
      const newOrganization = new Organization({
        ...req.body,
        confirmationCode,
      });

      if (req.file) {
        newOrganization.image = catchImg;
      } else {
        newOrganization.image =
          "https://res.cloudinary.com/dhr13yihn/image/upload/v1694194164/proyectoEventland/organizationAssets/team-building_iorpit.png";
      }

      try {
        const organizationSave = await newOrganization.save();
        if (organizationSave) {
          const { _id } = organizationSave;
          try {
            await City.findByIdAndUpdate(req.body.city, {
              $push: { organizations: _id },
            });
          } catch (error) {
            return res
              .status(404)
              .json("Error updating City in field (organizations)");
          }
          const info = await sendEmail(email, name, confirmationCode);

          if (!info) setTestEmailSend(false);
          else if (info.accepted.length) setTestEmailSend(true);
          else setTestEmailSend(false);

          if (getTestEmailSend()) {
            setTestEmailSend(false);
            return res
              .status(200)
              .json({ organization: organizationSave, confirmationCode });
          } else {
            setTestEmailSend(false);
            return res.status(404).json({
              organization: organizationSave,
              confirmationCode: "error, resend code",
            });
          }
        } else {
          return res.status(404).json("not saved organization");
        }
      } catch (error) {
        return res
          .status(404)
          .json({ error: error, message: "error saving organization" });
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this organization already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);

    return next(error);
  }
};

//! CHECK CODE ORGANIZATION

const checkNewOrganization = async (req, res, next) => {
  try {
    //! nos traemos de la req.body el email y codigo de confirmation
    const { email, confirmationCode } = req.body;

    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const organizationExists = await Organization.findOne({ email });
    if (!organizationExists) {
      //!No existe----> 404 de no se encuentra
      return res.status(404).json("Organization not found");
    } else {
      // cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
      if (confirmationCode === organizationExists.confirmationCode) {
        // si coinciden los codigos hacemos la actualizacion de check
        try {
          await organizationExists.updateOne({ check: true });
          // hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
          const updateOrganization = await Organization.findOne({ email });

          // este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
          return res.status(200).json({
            testCheckOk: updateOrganization.check == true ? true : false,
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
    const organizationExists = await Organization.findOne({
      email: req.body.email,
    });

    if (organizationExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `Tu código es ${organizationExists.confirmationCode}`,
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
      return res.status(404).json("Organization not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//!------------ LOGIN----------------------------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const organizationDB = await Organization.findOne({ email });

    if (organizationDB) {
      // comparamos la contrase del body con la del organization de la DB
      if (bcrypt.compareSync(password, organizationDB.password)) {
        // si coinciden generamos el token
        const token = generateToken(organizationDB._id, email);
        // mandamos la respuesta con el token
        return res.status(200).json({
          organization: organizationDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("Organization no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!----------------AUTOLOGIN---------------------------------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const organizationDB = await Organization.findOne({ email });

    if (organizationDB) {
      if (password == organizationDB.password) {
        const token = generateToken(organizationDB._id, email);
        return res.status(200).json({
          organization: organizationDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("Organization no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -------------- CONTRASEÑA OLVIDADA

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const organizationDb = await Organization.findOne({ email });
    if (organizationDb) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/organizations/sendPassword/${organizationDb._id}`,
      );
    } else {
      return res.status(404).json("Organization no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationDb = await Organization.findById(id);
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
      to: organizationDb.email,
      subject: "-----",
      text: `${organizationDb.name}.Tu nueva contraseña es ${passwordSecure} . Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
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
          await Organization.findByIdAndUpdate(id, {
            password: newPasswordBcrypt,
          });
          const organizationUpdatePassword = await Organization.findById(id);
          /// comprobamos que se haya actualizado correctamente
          if (
            bcrypt.compareSync(
              passwordSecure,
              organizationUpdatePassword.password,
            )
          ) {
            return res.status(200).json({
              updateOrganization: true,
              sendPassword: true,
            });
          } else {
            // si no se ha actualizado damos feedback de que se envio la contraseña pero no se actualizó
            return res.status(404).json({
              updateOrganization: false,
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
    const { _id } = req.organization;
    const validated = validator.isStrongPassword(newPassword);

    if (validated) {
      if (bcrypt.compareSync(password, req.organization.password)) {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          /// hacemos la actualizacion si las contraseñas coinciden
          await Organization.findByIdAndUpdate(_id, {
            password: newPasswordHashed,
          });

          /// hacemos una comprobacion para ver si se ha actualizado las contraseñas
          const organizationUpdate = await Organization.findById(_id);
          if (bcrypt.compareSync(newPassword, organizationUpdate.password)) {
            return res.status(200).json({
              updateOrganization: true,
            });
          } else {
            return res.status(200).json({
              updateOrganization: false,
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
    await Organization.syncIndexes();
    // creamos una nueva instancia del modelo User con el req.body
    const patchOrganization = new Organization(req.body);
    // si tiene archivo la request entonces le metemos al usuario creado esa imagen
    if (req.file) {
      patchOrganization.image = req.file.path;
    }
    // importante quedarnos con el id del usuario antes de actualizarse
    patchOrganization._id = req.organization._id;
    // LA CONTRASEÑA NO SE PUEDE MODIFICAR: ponemos la contraseña de la db
    patchOrganization.password = req.organization.password;
    // Lo mismo con el rol, confirmationCode, check, NO SE PUEDE MODIFICAR POR AQUI
    patchOrganization.role = req.organization.role;
    patchOrganization.confirmationCode = req.organization.confirmationCode;
    patchOrganization.check = req.organization.check;
    patchOrganization.email = req.organization.email;

    // Ahora cogemos y actualizamos el usuario

    try {
      await Organization.findByIdAndUpdate(
        req.organization._id,
        patchOrganization,
      );
      if (req.file) {
        deleteImgCloudinary(req.organization.image);
      }
      const updateOrganization = await Organization.findById(
        req.organization._id,
      );
      // nos traemos del objeto del body sus claves
      const updateKeys = Object.keys(req.body);
      /// -----> venerar un array con los resultados del test en el runtime
      const testUpdate = [];

      // recorremos el objeto con las claves y comprobamos si los valores del back coinciden
      updateKeys.forEach((item) => {
        // si coinciden pushamos un objeto con el nombre del item y un true
        if (updateOrganization[item] == req.body[item]) {
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
        updateOrganization.image == req.file.path
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

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationById = await Organization.findById(id);

    if (organizationById) {
      return res.status(200).json({
        data: await Organization.findById(id).populate("events"),
      });
    } else {
      res.status(404).json("organization not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name = "" } = req.params;
    const organizationByName = await Organization.find();
    const filterOrganization = organizationByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterOrganization.length > 0) {
      return res.status(200).json({ data: filterOrganization });
    } else {
      res.status(404).json("organization not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllOrganizations = async (req, res, next) => {
  try {
    const allOrganizations = await Organization.find();
    if (allOrganizations.length > 0) {
      return res.status(200).json({ data: allOrganizations });
    } else {
      return res.status(404).json("organizations not found");
    }
  } catch (error) {
    return next(error);
  }
};

//!DELETE

const deleteOrganization = async (req, res, next) => {
  try {
    const { _id, image } = req.organization;
    await Organization.findByIdAndDelete(_id);
    try {
      await City.updateMany(
        { organizations: _id },
        { $pull: { organizations: _id } },
      );

      try {
        await Event.updateMany(
          { organization: _id },
          { $unset: { organization: _id } },
        );
        try {
          await User.updateMany(
            { organizationsFav: _id },
            { $pull: { organizationsFav: _id } },
          );
        } catch (error) {
          return res
            .status(400)
            .json("error borrando la organización a causa del modelo de User");
        }
      } catch (error) {
        return res
          .status(400)
          .json(
            "error borrando la organización a causa del modelo de Event(organization)",
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json("error borrando la organización a causa del modelo de City");
    }
    //
    if (await Organization.findById(_id)) {
      return res.status(404).json("Organization not deleted");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("Organization succesfully deleted");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET NEXT EVENTS

const getNextEvents = async (req, res, next) => {
  try {
    if (req.organization.events?.length > 0) {
      const events = req.organization.events;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            currentEvent.date > currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      return res.status(200).json({ data: arrayNextEvents });
    } else {
      return res
        .status(404)
        .json("there's no events in this organization yet!");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET PAST EVENTS

const getPastEvents = async (req, res, next) => {
  try {
    if (req.organization.events?.length > 0) {
      const events = req.organization.events;
      const currentDate = new Date();
      const arrayNextEvents = [];
      await Promise.all(
        events.map(async (event) => {
          const currentEvent = await Event.findById(event);
          return (
            currentEvent.date < currentDate &&
            arrayNextEvents.push(currentEvent)
          );
        }),
      );
      return res.status(200).json({ data: arrayNextEvents });
    } else {
      return res
        .status(404)
        .json("there's no events in this organization yet!");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerOrganization,
  checkNewOrganization,
  resendCode,
  login,
  autoLogin,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  getById,
  getByName,
  getAllOrganizations,
  deleteOrganization,
  getNextEvents,
  getPastEvents,
};
