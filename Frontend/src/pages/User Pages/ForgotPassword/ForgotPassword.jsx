import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../../../services/user.service";
import { useForgotPasswordError } from "../../../hooks";
import { Button } from "@chakra-ui/react";

export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);

  //! 1)-------------------- LA FUNCIOON QUE SE ENCARGA DE GESTIONAR LOS DATOS DEL FORMULARIO

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setRes(await forgotPasswordUser(formData));
    setIsLoading(false);
  };
  //! 2) ----------------USEEFFECT QUE GESTIONA LA RES CON SUS ERRORES Y SUS 200
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForgotPasswordError(res, setRes, setForgotOk);
    console.log(res);
  }, [res]);

  //! 3) ---------------- ESTADOS DE NAVEGACION O QUE LA fiuncion ESTA ok

  if (forgotOk) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="ForgotPasswordBody">
        <div className="form-wrap">
          <h1>Change your password</h1>

          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="email"
                name="email"
                {...register("email", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Email
              </label>
            </div>

            <div className="btn_container">
              <Button
                className="btn"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Change password
              </Button>
            </div>

            <p className="bottom-text">
              <small>Enter your email to send you the new password 💌</small>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
