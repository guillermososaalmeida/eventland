/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRegisterError } from "../../../hooks";
import { registerUser } from "../../../services/user.service";
import { useAuth } from "../../../context/authContext";
import { Uploadfile } from "../../../components/UploadFile/UploadFile";
import "./Register.css";

export const Register = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [okRegister, setOkRegister] = useState(false);
  const [gender, setGender] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status === 200) bridgeData("ALLUSER");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        role: "user",
        gender: gender,
        image: inputFile[0],
      };
      setIsLoading(true);
      setRes(await registerUser(customFormData));
      setIsLoading(false);
    } else {
      const customFormData = {
        ...formData,
        role: "user",
        gender: gender,
      };
      setIsLoading(true);
      setRes(await registerUser(customFormData));
      setIsLoading(false);
    }
  };

  if (okRegister) {
    return <Navigate to="/check" />;
  }
  return (
    <>
      <div className="form-container">
        <Box className="card">
          <Text fontSize="3xl" as="b">
            Sign in
          </Text>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name">UserName</FormLabel>
              <Input
                borderBottom={"1px solid #f6f3e0"}
                bg="transparent"
                id="name"
                variant="filled"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "000000aa" }}
                placeholder="name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderBottom={"1px solid #f6f3e0"}
                bg="transparent"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "#f6f3e0" }}
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
                borderBottom={"1px solid #f6f3e0"}
                bg="transparent"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "#f6f3e0" }}
                id="email"
                variant="filled"
                placeholder="your email"
                {...register("email", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              {/*el onclick setea el estado de gender  */}
              <Flex>
                <Button
                  onClick={() => {
                    setGender("hombre");
                  }}
                  _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}
                >
                  Hombre
                </Button>
                <Button
                  onClick={() => {
                    setGender("mujer");
                  }}
                  _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}
                >
                  Mujer
                </Button>
                <Button
                  onClick={() => {
                    setGender("otros");
                  }}
                  _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}
                >
                  Otros
                </Button>
                <Button
                  onClick={() => {
                    setGender("prefiero no decirlo");
                  }}
                  _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}
                >
                  Prefiero no decirlo
                </Button>
              </Flex>
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
              <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>

              <Input
                type="date"
                id="dateOfBirth"
                variant="filled"
                {...register("dateOfBirth", {})}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
              isDisabled={!gender}
            >
              Submit
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
};
