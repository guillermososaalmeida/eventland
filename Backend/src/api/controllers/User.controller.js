const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const {
  getTestEmailSend,
  setTestEmailSend,
} = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const setError = require("../helpers/handle-error");
const User = require("../models/User.model");

//!-------Register
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    // gestionar la generacion de un codigo random para que se pueda verificar
    let confirmationCode = randomCode();

    // Destructuring del email y el animation-name:
    const { email, name } = req.body;

    // vamos a comprobar que el usuario existe
    const userExist = await User.findOne({ email: email }, { name: name });

    // condicionamos el codigo a que este usuario exista o no

    if (!userExist) {
      // istanciamos al modelo y creamos una nueva instancia del mismo
      const newUser = new User({ ...req.body, confirmationCode });

      // vamos a ver si tenemos imagen subida por el form y si exsite la metemos al modelo instanciado
      if (req.file) {
        newUser.image = catchImg;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      // guardar el nuevo usuario dentro de mongo const {second} =

      try {
        const userSave = await newUser.save();
        if (userSave) {
          // si hemos guardado el usuario, llamamos a una funct que nos envie el email

          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
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
          }, 1400);
        } else {
          return res.status(404).json("not saved user");
        }
      } catch (error) {
        return res.status(404).json("not saved user", error.message);
      }
    } else {
      /// si no existe lanzamos un error y borramos la imagen subida en caso que la haya
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    return next(error);
  }
};

//!------------------------------------CHECK CODECONFIRMATION USER NUEVO--------------

const checkNewUser = async (req, res, next) => {
  try {
    //! nos traemos de la req.body el email y codigo de confirmation
    const { email, confirmationCode } = req.body;

    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email });
    if (!userExists) {
      //!No existe----> 404 de no se encuentra
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
        await User.findByIdAndDelete(userExists._id);

        // borramos la imagen
        deleteImgCloudinary(userExists.image);
        // metemos 200 aunque no ha salido bien el controlador porque sino salta el error primero
        /// si le ponemos 404 salta el error de arriba de User not found aunque si lo ha borrado
        // devolvemos un 200 con el test de ver si el delete se ha hecho correctamente
        return res.status(200).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? "error delete user"
            : "ok delete user",
        });
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, "General error check code"));
  }
};
