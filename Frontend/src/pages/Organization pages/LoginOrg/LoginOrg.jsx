// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginOrgService } from "../../../services/org.service";
import { useOrgLoginError } from "../../../hooks/useOrgLoginError";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useOrgAuth } from "../../../context/authOrgContext";

// export const LoginOrg = () => {
//   return (
//     <div>
//       <Link to="/homeorg">Home Organization</Link>
//       <br />
//       <Link to="/registerorg">Register Organization</Link>
//     </div>
//   );
// };

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedOrg, setLoggedOrg] = useState({});
  const [loginOk, setLoginOk] = useState(false);

  const { organizationLogin, setOrganization } = useOrgAuth();

  const { handleSubmit, register } = useForm();

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setLoggedOrg(await loginOrgService(formData));
    //llama al servicio de login con los datos del formulario para logarlo y darle token
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgLoginError(loggedOrg, setLoggedOrg, organizationLogin, setLoginOk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedOrg]);

  useEffect(() => {
    setOrganization(() => null);
    localStorage.removeItem("organization");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //!GESTIONAR EL REDIRECT SI SE LOGEA O NO

  if (loginOk) {
    if (loggedOrg?.data?.organization.check == false) {
      return <Navigate to="/checkorg" />;
    } else {
      return <Navigate to="/homeorg" />;
    }
  }

  return (
    <>
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
          <Link to="/forgotpassword/forgotpasswordorg">Reset password</Link>
        </p>
      </div>
    </>
  );
};
