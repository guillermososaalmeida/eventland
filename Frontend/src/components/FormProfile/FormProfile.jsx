import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FigureUser } from "../FigureUser/FigureUser";
import { Uploadfile } from "../UploadFile/UploadFile";
import { useForm } from "react-hook-form";
import { useUpdateError } from "../../hooks/useUpdateError";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateUser } from "../../services/user.service";

export const FormProfile = () => {
  const { user, setUser, logout } = useAuth(); // destructuring de lo que necesitamos del context
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState();
  const [send, setSend] = useState(false);

  const defauldData = {
    name: user?.user,
  };

  //!----------- cuestionario

  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        } else {
          const customFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        }
      }
    });
  };

  useEffect(() => {
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);
  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap="10px"
        alignItems="center"
      >
        <Box paddingInline="10px">
          <FigureUser user={user} />
        </Box>
        <Box>
          <Stack>
            <Text as="b">Change your data profile</Text>
            <Text>Please, enter your new data profile</Text>
          </Stack>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                autoComplete="false"
                name="name"
                defaultValue={defauldData?.name}
                {...register("name")}
              />
            </FormControl>
            <Uploadfile />
            <Button
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              marginTop="5px"
            >
              Change data profile
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};
