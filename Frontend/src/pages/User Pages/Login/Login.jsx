import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { loginUserService } from "../../../services/user.service";
import { useLoginError } from "../../../hooks";
import { useAuth } from "../../../context/authContext";
import { Button, Box, useColorModeValue } from "@chakra-ui/react";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [loginOk, setLoginOk] = useState(false);

  const { userLogin, setUser } = useAuth();

  const { handleSubmit, register } = useForm();

  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const formSubmit = async (formData) => {
    setIsLoading(true);
    setLoggedUser(await loginUserService(formData));
    //llama al servicio de login con los datos del formulario para logarlo y darle token
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoginError(loggedUser, setLoggedUser, userLogin, setLoginOk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem("user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //!GESTIONAR EL REDIRECT SI SE LOGEA O NO

  if (loginOk) {
    if (loggedUser?.data?.user.check == false) {
      return <Navigate to="/check" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return (
    <Box bg={bg} color={color}>
      <div className="form-wrap">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <p>email</p>
            <label
              htmlFor="custom-input"
              className="custom-placeholder"
            ></label>
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", {})}
            />
          </div>
          <div className="password_container form-group">
            <p>password</p>
            <label
              htmlFor="custom-input"
              className="custom-placeholder"
            ></label>

            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", {})}
            />
          </div>
          <div className="btn_container">
            <Button className="btn" type="submit" isLoading={isLoading}>
              Login
            </Button>
          </div>
        </form>
        <p>
          Forgot password?
          <Link to="/forgotpassword/forgotpassword">Reset password</Link>
        </p>
      </div>
    </Box>
  );
};
