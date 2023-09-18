import { useEffect, useState } from "react";
import {
  createEvent,
  getAllEstablishments,
} from "../../../services/event.service";
import { useForm } from "react-hook-form";
import { useCreateEventError } from "../../../hooks/Event Hooks/useCreateEventError";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Uploadfile } from "../../../components/UploadFile/UploadFile";

export const CreateEvent = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [okCreate, setOkCreate] = useState(false);
  const [establishments, setEstablishments] = useState([{}]);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  useEffect(() => {
    if (okCreate) {
      setSelectedEstablishment(null);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [okCreate]);

  useEffect(() => {
    const getEstablishments = async () => {
      setIsLoading(true);
      const res = await getAllEstablishments();
      setEstablishments(res);
      setIsLoading(false);
    };
    getEstablishments();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCreateEventError(res, setOkCreate, setRes);
  }, [res]);

  const formSubmit = async (formData) => {
    if (!selectedEstablishment) return;
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        establishment: selectedEstablishment._id,
        city: selectedEstablishment.city ? selectedEstablishment.city : "",
        image: inputFile[0],
      };
      setIsLoading(true);
      setRes(await createEvent(customFormData));
      setIsLoading(false);
    } else {
      const customFormData = {
        ...formData,
        city: selectedEstablishment.city ? selectedEstablishment.city : "",
        establishment: selectedEstablishment._id,
      };
      setIsLoading(true);
      setRes(await createEvent(customFormData));
      setIsLoading(false);
    }
  };

  // {if (okCreate) {
  //   return <Navigate to="/createevent" />;
  // }}
  return (
    <>
      <Box
        as="div"
        className="form-wrap"
        width="100vw"
        p="1"
        background="#ff8243"
        border="1px yellow"
        borderRadius={10}
        boxShadow="dark-lg"
      >
        <Text fontSize="3xl" as="b">
          Create Event
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
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              variant="filled"
              placeholder="describe your organization"
              {...register("description")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="establishment">Establishment</FormLabel>

            <select
              onChange={(event) => {
                const establishment = establishments.find(
                  (x) => x._id === event.target.value,
                );
                if (establishment) setSelectedEstablishment(establishment);
                else setSelectedEstablishment(null);
              }}
            >
              <option value={null}>Select an establishment</option>
              {establishments.map((establishment, index) => (
                <option key={index} value={establishment._id}>
                  {establishment.name}
                </option>
              ))}
            </select>
          </FormControl>
          <Uploadfile />
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              type="date"
              id="date"
              variant="filled"
              {...register("date")}
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
