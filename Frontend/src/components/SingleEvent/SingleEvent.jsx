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
  Text,
} from "@chakra-ui/react";

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

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
