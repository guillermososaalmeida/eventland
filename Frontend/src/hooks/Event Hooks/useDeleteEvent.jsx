import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteEventService } from "../../services/event.service";

export const useDeleteEvent = (navigate, id) => {
  Swal.fire({
    title: "Are you sure you want to delete your event?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteEventService(id);
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Deleted Event",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/homeorg");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No deleted Event ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
