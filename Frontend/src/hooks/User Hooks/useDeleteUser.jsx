import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUserService } from "../../services/user.service";

export const useDeleteUser = (setUser, navigate) => {
  Swal.fire({
    title: "Are you sure you want to delete your profile?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteUserService();
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Deleted User",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(() => null);
          localStorage.removeItem("user");
          navigate("/");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No deleted User ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
