import {
  Card,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetEventsFromSearchParams } from "../../../hooks";
import { Link } from "react-router-dom";

export const EventList = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const eventData = useGetEventsFromSearchParams();
  return (
    <Box bg={bg} color={color}>
      <Stack>
        <Heading p="5">Home</Heading>
        <Heading ml="5" size="4xs" fontSize="20">
          Todos los eventos aquí
        </Heading>
      </Stack>
      <HStack flexWrap="wrap" gap="10" p="5">
        {eventData?.length > 0 ? (
          eventData?.map((event) => (
            <Card key={event._id} borderRadius="15">
              <Center flexDir="column">
                <Image
                  w="3xs"
                  h="2xs"
                  objectFit="cover"
                  src={event.image}
                  alt={event.name}
                  borderRadius="15"
                />
                <Link to={`/eventdetail/${event._id}`}>{event?.name}</Link>
              </Center>
            </Card>
          ))
        ) : (
          <Text>No se ha encontrado ningún evento</Text>
        )}
      </HStack>
    </Box>
  );
};
