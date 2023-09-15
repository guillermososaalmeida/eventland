import { Card, Center, HStack, Heading, Image, Stack } from "@chakra-ui/react";
import { useGetEventsFromSearchParams } from "../../../hooks";
import { Link } from "react-router-dom";

export const EventList = () => {
  const eventData = useGetEventsFromSearchParams();
  return (
    <>
      <Stack>
        <Heading p="5" color="black">
          Home
        </Heading>
        <Heading ml="5" size="4xs" color="black" fontSize="20">
          All events here!!
        </Heading>
      </Stack>
      <HStack flexWrap="wrap" gap="10" p="5">
        {eventData?.map((event) => (
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
        ))}
      </HStack>
    </>
  );
};
