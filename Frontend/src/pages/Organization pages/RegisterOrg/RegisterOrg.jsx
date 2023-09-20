/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { registerOrg } from "../../../services/org.service";
import { Uploadfile } from "../../../components/UploadFile/UploadFile";
import { useOrgAuth } from "../../../context/authOrgContext";
import { useOrgRegisterError } from "../../../hooks";
export const RegisterOrg = () => {
  const { allOrganization, setAllOrganization, bridgeDataOrg } = useOrgAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgRegisterError(res, setOkRegister, setRes, setAllOrganization);
    if (res?.status === 200) bridgeDataOrg("ALLORGANIZATION");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };
      setIsLoading(true);
      setRes(await registerOrg(customFormData));
      setIsLoading(false);
    } else {
      const customFormData = {
        ...formData,
      };
      setIsLoading(true);
      setRes(await registerOrg(customFormData));
      setIsLoading(false);
    }
  };

  if (okRegister) {
    return <Navigate to="/checkorg" />;
  }
  return (
    <>
      <Box className="card">
        <Text fontSize="3xl" as="b">
          Sign in
        </Text>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              variant="filled"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              variant="filled"
              autoComplete="false"
              placeholder="password"
              {...register("password", {
                required: "This is required",
              })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              variant="filled"
              placeholder="your email"
              {...register("email", {
                required: "This is required",
              })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              variant="filled"
              placeholder="describe your organization"
              {...register("description")}
            />
          </FormControl>

          <Uploadfile />
          {/* <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">City</FormLabel>
            <Input
              id="city"
              variant="filled"
              placeholder="city"
              {...register("city", {})}
            />
          </FormControl> */}
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="year">Year of creation</FormLabel>
            <Input
              type="year"
              id="year"
              variant="filled"
              {...register("year")}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};
