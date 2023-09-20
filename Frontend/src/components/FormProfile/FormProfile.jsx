/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useAuth } from "../../context/authContext";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
  useRadioGroup,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { RadioCard } from "../RadioCard/RadioCard";
import { Uploadfile } from "../UploadFile/UploadFile";
import { FigureUser } from "../FigureUser/FigureUser";
import { updateUser } from "../../services/user.service";
import { useDeleteUser, useUpdateError } from "../../hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
export const FormProfile = () => {
  const { user, setUser, logout } = useAuth(); // destructuring de lo que necesitamos del context
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState();
  const options = ["hombre", "mujer", "otros", "prefiero no decirlo"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: user?.user.gender,
  });
  const group = getRootProps();
  const navigate = useNavigate();
  const defauldData = {
    name: user?.user,
  };
  const bg = useColorModeValue("red.500", "blue.500");

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
            gender: gender,
            image: inputFile[0],
          };
          setIsLoading(true);
          setRes(await updateUser(customFormData));
          setIsLoading(false);
        } else {
          const customFormData = {
            ...formData,
            gender: gender,
          };

          setIsLoading(true);
          setRes(await updateUser(customFormData));
          setIsLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    useUpdateError(res, setRes, setUser, logout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <FigureUser user={{ image: user.image, email: user.email }} />
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
            <HStack
              {...group}
              onClick={(e) => {
                console.log(e.target.value);
                setGender(e.target.value);
              }}
            >
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            <Button type="submit" marginTop="5px" isLoading={isLoading} bg={bg}>
              Change data profile
            </Button>
          </form>
        </Box>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          onClick={() => {
            useDeleteUser(setUser, navigate);
          }}
        >
          <Button>Borrar usuario</Button>
          <IconButton
            aria-label="Borrar usuario"
            icon={<DeleteIcon color="red" />}
          />
        </ButtonGroup>
      </Box>
    </>
  );
};
