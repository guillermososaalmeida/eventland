import { useEffect, useState } from "react";
import { getSingleNextEvent } from "../../services/user.service";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const SingleEvent = () => {
  const [event, setEvent] = useState({});
  useEffect(() => {
    const getEvent = async () => {
      const data = await getSingleNextEvent();
      setEvent(await data);
    };
    getEvent();
  }, []);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={event.image}
        alt={event.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{event.name}</Heading>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            <AddIcon />

            <Link to={`/eventdetail/${event._id}`}>Info</Link>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
