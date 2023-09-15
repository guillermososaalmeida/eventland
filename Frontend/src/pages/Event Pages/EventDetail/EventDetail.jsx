import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../services/event.service";
import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { Countdown } from "../../../components";

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const { image, name, description, date } = event;

  console.log("event", date);
  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack align="center">
        <Box maxWidth="900px">
          <Heading
            position="absolute"
            bg="#1a202ccc"
            rounded="10"
            p="4"
            mt="1em"
            ml="1em"
          >
            {name}
          </Heading>
          <Heading
            size="sm"
            position="absolute"
            bg="#1a202ccc"
            rounded="10"
            p="4"
            mt="7.5em"
            ml="2.2em"
          >
            {event.establishment?.name}
          </Heading>
          <Heading
            position="absolute"
            bg="#1a202ccc"
            rounded="10"
            p="4"
            mt="10em"
            ml="18em"
          >
            {event.city?.name}
          </Heading>
          <Countdown date={event?.date} />
          <Image
            src={image}
            alt={name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
          />
        </Box>
        <Box maxWidth="900px" p="2">
          {description}
        </Box>
      </Stack>
    </>
  );
};
