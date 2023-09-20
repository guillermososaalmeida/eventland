/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { Uploadfile } from "../UploadFile/UploadFile";
import { FigureOrg } from "../FigureOrg/FigureOrg";
import { updateOrg } from "../../services/org.service";
import { useOrgDelete, useOrgUpdateError } from "../../hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import { useOrgAuth } from "../../context/authOrgContext";
import { useNavigate } from "react-router-dom";
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
//!AÑADIR TAMBIÉN QUE PUEDA CAMBIAR CITY
export const OrgFormProfile = () => {
  const { organization, setOrganization, logoutUpdateOrg } = useOrgAuth(); // destructuring de lo que necesitamos del context
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const defauldData = {
    name: organization?.organization,
    description: organization?.description,
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
            image: inputFile[0],
          };
          setIsLoading(true);
          setRes(await updateOrg(customFormData));
          setIsLoading(false);
        } else {
          const customFormData = {
            ...formData,
          };

          setIsLoading(true);
          setRes(await updateOrg(customFormData));
          setIsLoading(false);
        }
      }
    });
  };
  console.log(defauldData);
  useEffect(() => {
    useOrgUpdateError(res, setRes, setOrganization, logoutUpdateOrg);
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
          <FigureOrg
            organization={{
              image: organization.image,
              email: organization.image,
            }}
          />
        </Box>
        <Box>
          <Stack>
            <Text as="b">Cambia tus datos de organizador</Text>
            <Text>Por favor, introduce tus nuevos datos</Text>
          </Stack>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl>
              <FormLabel>Nombre de la organización</FormLabel>
              <Input
                type="text"
                autoComplete="false"
                name="name"
                defaultValue={defauldData?.name}
                {...register("name")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Input
                type="text"
                autoComplete="false"
                name="description"
                defaultValue={defauldData?.description}
                {...register("description")}
              />
            </FormControl>
            <Uploadfile />

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
            useOrgDelete(setOrganization, navigate);
          }}
        >
          <Button>Borrar organización</Button>
          <IconButton
            aria-label="Borrar organización"
            icon={<DeleteIcon color="red" />}
          />
        </ButtonGroup>
      </Box>
    </>
  );
};
