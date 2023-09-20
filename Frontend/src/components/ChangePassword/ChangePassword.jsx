/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Button, Box, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import { changePasswordUserToken } from "../../services/user.service";
import { useChangePasswordError } from "../../hooks";

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  //! -----------------1) LA FUNCIOON QUE GESTIONA EL FORMULARIO

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;

    if (newPassword == confirmPassword) {
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(74, 186, 158)",
        cancelButtonColor: "#c94c4c",
        confirmButtonText: "YES",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          setRes(await changePasswordUserToken({ password, newPassword }));
          setIsLoading(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    useChangePasswordError(res, setRes, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  //! no tenemos condicionales de navegacion porque cuando me desloguee el componente protected me llevara al login

  return (
    <Box bg={bg} color={color}>
      <div className="form-wrap">
        <h1>Change your password ♻</h1>
        <p>Please, enter your old and new passwords</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Old password
            </label>
          </div>
          <div className="newPassword_container form-group">
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
          </div>
          <div className="confirmPassword_container form-group">
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register("confirmPassword", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
          </div>
          <div className="btn_container">
            <Button className="btn" type="submit" isLoading={isLoading}>
              CHANGE PASSWORD
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};
