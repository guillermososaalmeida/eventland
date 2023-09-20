import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOrgAuth } from "../../../context/authOrgContext";
import {
  checkConfirmationOrg,
  resendCodeConfirmationOrg,
} from "../../../services/org.service";
import {
  useOrgCheckCodeError,
  useOrgResendCodeError,
  useOrgAutoLogin,
} from "../../../hooks";
import { Box, useColorModeValue } from "@chakra-ui/react";
export const CheckCodeOrg = () => {
  // eslint-disable-next-line no-unused-vars
  const { allOrganization, organizationLogin, setOrganization } = useOrgAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  // resResend va a ser para gestionar el renvio del codigo de confirmacion
  const [resResend, setResResend] = useState({});
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false);
  const [okDeleteOrg, setOkDeleteOrg] = useState(false);
  const [organizationNotFound, setOrganizationNotFound] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  //! -------FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-------
  const formSubmit = async (formData) => {
    const organizationLocal = localStorage.getItem("organization");

    if (organizationLocal == null) {
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: allOrganization.data.organization.email,
      };
      setSend(true);
      setRes(await checkConfirmationOrg(custFormData));
      setSend(false);
    } else {
      const parseOrganization = JSON.parse(organizationLocal);
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: parseOrganization.email,
      };
      setSend(true);
      setRes(await checkConfirmationOrg(custFormData));
      setSend(false);
    }
  };

  const handleReSend = async () => {
    const organizationLocal = localStorage.getItem("organization");
    if (organizationLocal != null) {
      const parseUser = JSON.parse(organizationLocal);
      const customFormData = {
        email: parseUser.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationOrg(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        email: allOrganization?.data?.organization?.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationOrg(customFormData));
      setSend(false);
    }
  };

  //! --------USE EFFECT QUE NOSC SIRVE CUANDO CAMBIA RES A LANZAR EL COMPROBADOR DE ERRORES
  useEffect(() => {
    console.log(res);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteOrg,
      organizationLogin,
      setOrganizationNotFound,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  useEffect(() => {
    console.log(resResend);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgResendCodeError(resResend, setResResend, setOrganizationNotFound);
  }, [resResend]);

  //! -------- PONEMOS LOS CONDICIONALES QUE EVALUAN SI ESTAN A TRUE LOS ESTADOS DE NAVEGACION (deleUser, okCheck)

  if (okDeleteOrg) {
    // si borramos al useer por meter el codigo mal lo mandamos de nuevo a registrase
    return <Navigate to="/registerorg" />;
  }
  if (okCheck) {
    console.log("el check esta ok 🧡");

    // vamos a evaluar que venga a del login o del register
    if (!localStorage.getItem("organization")) {
      // viene del register le tengo que hacer el autologin
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useOrgAutoLogin(allOrganization, organizationLogin);
    } else {
      return <Navigate to="/homeorg" />;
    }
  }

  if (organizationNotFound) {
    /// lo mando al login porque aparece un 404 de user no found porque me ha recargado la pagina y se ha reseteado allUser
    // por lo cual no tengo acceso al email y no puedo reconocerlo en el back
    return <Navigate to="/loginorg" />;
  }

  return (
    <Box bg={bg} color={color}>
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
              If the code is not correct ❌, your organization will be deleted
              from the database and you will need to register again.{" "}
            </small>
          </p>
        </form>
      </div>
    </Box>
  );
};
