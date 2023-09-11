import { updateToken } from "../util/updateToken";
import { APIUser } from "./service.config";

//!Para el register
export const registerUser = async (formData) => {
  return APIUser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res) //promesa para gestionar la asincronia.
    .catch((error) => error);
};

//! Para el confirmationCode

export const checkConfirmationUser = async (formData) => {
  return APIUser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el reenvio del confirmationCode

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el AutoLogin

export const autoLoginUser = async (formData) => {
  return APIUser.post("users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!Para el Login

export const loginUserService = async (formData) => {
  return APIUser.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para ChangePassword una vez logado

export const changePasswordUserToken = async (formData) => {
  return APIUser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Update user

export const updateUser = async (formData) => {
  return APIUser.patch("/users/update/update", formData, {
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
  return APIUser.delete("users/", {
    headers: { Authorization: `Bearer ${updateToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ForgotPassword

export const forgotPasswordUser = async (formData) => {
  return APIUser.patch("/users/forgotpassword/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};
