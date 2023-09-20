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
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const SingleEvent = () => {
  const [event, setEvent] = useState({});
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  useEffect(() => {
    const getEvent = async () => {
      const data = await getSingleNextEvent();
      setEvent(await data);
    };
    getEvent();
  }, []);

  return event ? (
    <Box bg={bg} color={color}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={event?.image}
          alt={event?.name}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{event?.name}</Heading>
          </CardBody>

          <CardFooter>
            <Link to={`/eventdetail/${event?._id}`}>
              <Button variant="solid" colorScheme="blue">
                <AddIcon />
                Info
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  ) : null;
};
