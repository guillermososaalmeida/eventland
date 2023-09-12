import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useOrgResendCodeError = (
  resResend,
  setResResend,
  setOrganizationNotFound,
) => {
  /// 200 ---------> resend false
  if (resResend?.data?.resend.toString() == "false") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error send email with your code ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /// 200 ---------> resend true

  if (resResend?.data?.resend.toString() == "true") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Ok send email with your code ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // 404 ----------> 'Organization not found'

  if (
    resResend?.response?.status == 404 &&
    resResend?.response?.data.includes("Organization not found")
  ) {
    setOrganizationNotFound(() => true);
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval server error ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // 500 ----------> interval server error
  if (resResend?.response?.status == 500) {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error! Don't send email ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
