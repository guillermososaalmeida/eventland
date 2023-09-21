import { Link } from "react-router-dom";

import { OrgNextEvents, OrgPastEvents } from "../../../components";
import { Button, Box, Heading, useColorModeValue } from "@chakra-ui/react";

export const HomeOrg = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Box bg={bg} color={color} minH="92.9vh">
      <Heading p="10">Comienza creando tu primer evento!</Heading>
      <div>
        <Link to="/createeventorg">
          <Button>Create Event</Button>
        </Link>
      </div>
      <OrgNextEvents />
      <OrgPastEvents />
    </Box>
  );
};
