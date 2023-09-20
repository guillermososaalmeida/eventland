/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../../services/event.service";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AvatarCustomGroup, Countdown } from "../../../components";
import { useDeleteEvent } from "../../../hooks";

export const EventDetailOrg = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
  }, [id]);
  const [isFollowers, setIsFollowers] = useState();
  const { image, name, description } = event;

  return (
    <Box bg={bg} color={color}>
      <Stack align="center">
        <Box maxWidth="900px" position="relative" display="inline-block">
          <Heading
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="0"
            left="0"
            m="2"
          >
            {name}
          </Heading>
          <Heading
            size="sm"
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="20"
            left="0"
            m="2"
          >
            {event.establishment?.name}
          </Heading>
          <Heading
            position="absolute"
            bg={bg}
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
          <AvatarCustomGroup
            event={event}
            isFollowers={isFollowers}
            setIsFollowers={setIsFollowers}
          />
        </Box>
        <Divider />
        <Flex maxWidth="900px" alignItems="center" gap="2em">
          <Box p="1em" mr="8em">
            <Flex>
              <Avatar src={event?.organization?.image} />
              <Heading p="4">{event?.organization?.name}</Heading>
            </Flex>
            <Text p="1em">{event?.organization?.description}</Text>
          </Box>
          <Box m="10">
            <Text pr="1em" letterSpacing="1px" m="5">
              Seguidores:
            </Text>
            <AvatarGroup size="md" max={3}>
              {event?.organization?.usersFav?.map((user, index) => (
                <Avatar name={user?.name} src={user?.image} key={index} />
              ))}
            </AvatarGroup>
          </Box>
        </Flex>
      </Stack>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button onClick={() => useDeleteEvent(navigate, id)}>
          Borrar evento
        </Button>
      </ButtonGroup>
    </Box>
  );
};
