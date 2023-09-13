import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteOrgService } from "../../services/org.service";

export const useOrgDelete = (setOrganization, navigate) => {
  Swal.fire({
    title: "Are you sure you want to delete your profile?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteOrgService();
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Deleted Organization",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });
          setOrganization(() => null);
          localStorage.removeItem("organization");
          navigate("/");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No deleted Organization ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
