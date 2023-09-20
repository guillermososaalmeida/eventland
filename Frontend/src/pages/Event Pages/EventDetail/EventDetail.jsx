import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { getEventById } from "../../../services/event.service";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AvatarCustomGroup, Countdown } from "../../../components";
import { useEventLiked, useEventAttend } from "../../../hooks";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../context/authContext";

export const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const { image, name, description } = event;
  const { isEventAttended, handleToggleAttend, isLoading } = useEventAttend(id);
  const { isEventLiked, handleToggleLiked, isLoadingLiked } = useEventLiked(id);
  const isPastEvent = event && new Date(event.date) < new Date();
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const bgh = useColorModeValue("#b6e9e984", "#173F4Baa");
  const colorh = useColorModeValue("black", "#F4FAFF");
  const bgatt = useColorModeValue("#3be1cd", "#3be1cd");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
  }, [id, isEventAttended]);

  return (
    <Box bg={bg} color={color} h="90vh">
      <Stack align="center" p="1em">
        <Box maxWidth="900px" position="relative" display="inline-block">
          <Heading
            color={colorh}
            position="absolute"
            bg={bgh}
            rounded="10"
            p="4"
            top="0"
            left="0"
            m="2"
          >
            {name}
          </Heading>
          <Heading
            color={colorh}
            size="sm"
            position="absolute"
            bg={bgh}
            rounded="10"
            p="4"
            top="20"
            left="0"
            m="2"
          >
            {event.establishment?.name}
          </Heading>

          <Button
            rounded="50%"
            h="15%"
            w="8%"
            position="absolute"
            bottom="1"
            bg={bgh}
            m="2"
            onClick={() => (user ? handleToggleLiked() : navigate("/register"))}
            isLoading={isLoadingLiked}
            _hover={{ background: bgatt }}
          >
            {isEventLiked ? <BsHeartFill /> : <BsHeart />}
          </Button>

          <Heading
            color={colorh}
            position="absolute"
            bg={bgh}
            rounded="10"
            p="4"
            bottom="12"
            right="0"
            m="2"
          >
            {event.city?.name}
          </Heading>
          {event.date && <Countdown date={event?.date} />}
          <Image
            rounded="10"
            src={image}
            alt={name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
            maxWidth="100%"
          />
        </Box>
        <Box maxWidth="900px" display="flex" alignItems="center" gap="2em">
          <Text p="1em" mr="8em">
            {description}
          </Text>
          <Box align="center">
            {isPastEvent ? null : (
              <Button
                w="80%"
                bg={bgatt}
                onClick={() =>
                  user ? handleToggleAttend() : navigate("/register")
                }
                isLoading={isLoading}
              >
                {isEventAttended ? "No asistiré" : "Asistiré"}
              </Button>
            )}
            <AvatarCustomGroup
              event={event}
              isEventAttended={isEventAttended}
            />
          </Box>
        </Box>
        <Divider border={`1.2px solid ${color}`} />
        <Flex maxWidth="900px" alignItems="center" gap="2em">
          <Box p="1em" mr="8em">
            <Flex align="center">
              <Heading p="4">{event?.organization?.name}</Heading>
              <IconButton
                bg="transparent"
                aria-label="organization page"
                icon={<InfoOutlineIcon />}
                onClick={() =>
                  navigate(`/or_ganizationdetail/${event?.organization?._id}`)
                }
              />
            </Flex>
            <Text p="1em">{event?.organization?.description}</Text>
          </Box>
          <Box m="10" pl="30">
            <Image w="50%" src={event?.organization?.image} />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};
