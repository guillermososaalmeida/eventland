import { updateToken } from "../utils/updateToken";
import { APIUser } from "./service.config";

//!Para el register
export const registerOrg = async (formData) => {
  return APIUser.post("/organizations/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Para el confirmationCode

export const checkConfirmationUser = async (formData) => {
  return APIUser.post("/organizations/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el reenvio del confirmationCode

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/organizations/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el AutoLogin

export const autoLoginUser = async (formData) => {
  return APIUser.post("organizations/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!Para el Login

export const loginUserService = async (formData) => {
  return APIUser.post("/organizations/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para ChangePassword una vez logado

export const changePasswordUserToken = async (formData) => {
  return APIUser.patch("/organizations/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Update user

export const updateUser = async (formData) => {
  return APIUser.patch("/organizations/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Delete User
// No le pasamos parametros, lo coge directamente del token
export const deleteUserService = async () => {
  return APIUser.delete("organizations/", {
    headers: { Authorization: `Bearer ${updateToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ForgotPassword

export const forgotPasswordUser = async (formData) => {
  return APIUser.patch("/organizations/forgotpassword/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};
