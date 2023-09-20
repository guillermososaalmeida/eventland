/* import { Link } from "react-router-dom";
 */
import { Flex, Heading, Box, useColorModeValue } from "@chakra-ui/react";
import {
  FutureEvents,
  InterestedEvents,
  OrganizationsFav,
  PastEvents,
  SingleEvent,
} from "../../../components";

export const Home = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Box bg={bg} color={color}>
      <Flex p="5">
        <Heading>Tenemos miles de eventos ¡encuentra el tuyo!</Heading>
        <SingleEvent />
      </Flex>
      <FutureEvents />
      <PastEvents />
      <InterestedEvents />
      <OrganizationsFav />
    </Box>
  );
};
