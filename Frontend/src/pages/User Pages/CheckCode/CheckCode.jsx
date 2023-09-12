import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  checkConfirmationUser,
  resendCodeConfirmationUser,
} from "../../../services/user.service";
import { useCheckCodeError } from "../../../hooks/useCheckCodeError";
import { useAutoLogin } from "../../../hooks/useAutoLogin";
import { useResendCodeError } from "../../../hooks/useResendCodeError";

export const CheckCode = () => {
  // eslint-disable-next-line no-unused-vars
  const { allUser, userLogin, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  // resResend va a ser para gestionar el renvio del codigo de confirmacion
  const [resResend, setResResend] = useState({});
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false);
  const [okDeleteUser, setOkDeleteUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  //! -------FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-------
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: allUser.data.user.email,
      };
      setSend(true);
      setRes(await checkConfirmationUser(custFormData));
      setSend(false);
    } else {
      const parseUser = JSON.parse(userLocal);
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: parseUser.email,
      };
      setSend(true);
      setRes(await checkConfirmationUser(custFormData));
      setSend(false);
    }
  };

  const handleReSend = async () => {
    const userLocal = localStorage.getItem("user");
    if (userLocal != null) {
      const parseUser = JSON.parse(userLocal);
      const customFormData = {
        email: parseUser.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        email: allUser?.data?.user?.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  //! --------USE EFFECT QUE NOSC SIRVE CUANDO CAMBIA RES A LANZAR EL COMPROBADOR DE ERRORES
  useEffect(() => {
    console.log(res);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteUser,
      userLogin,
      setUserNotFound,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  useEffect(() => {
    console.log(resResend);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResendCodeError(resResend, setResResend, setUserNotFound);
  }, [resResend]);

  //! -------- PONEMOS LOS CONDICIONALES QUE EVALUAN SI ESTAN A TRUE LOS ESTADOS DE NAVEGACION (deleUser, okCheck)

  if (okDeleteUser) {
    // si borramos al useer por meter el codigo mal lo mandamos de nuevo a registrase
    return <Navigate to="/register" />;
  }
  if (okCheck) {
    console.log("el check esta ok 🧡");

    // vamos a evaluar que venga a del login o del register
    if (!localStorage.getItem("user")) {
      // viene del register le tengo que hacer el autologin
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAutoLogin(allUser, userLogin);
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (userNotFound) {
    /// lo mando al login porque aparece un 404 de user no found porque me ha recargado la pagina y se ha reseteado allUser
    // por lo cual no tengo acceso al email y no puedo reconocerlo en el back
    console.log("entro");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Verify your code 👌</h1>
        <p>Write the code sent to your email</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("confirmationCode", { required: false })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Registration code
            </label>
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Verify Code
            </button>
          </div>
          <div className="btn_container">
            <button
              id="btnResend"
              className="btn"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              onClick={() => handleReSend()}
            >
              Resend Code
            </button>
          </div>

          <p className="bottom-text">
            <small>
              If the code is not correct ❌, your user will be deleted from the
              database and you will need to register again.{" "}
            </small>
          </p>
        </form>
      </div>
    </>
  );
};
