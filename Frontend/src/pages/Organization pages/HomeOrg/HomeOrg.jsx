import { Link } from "react-router-dom";

import { OrgNextEvents, OrgPastEvents } from "../../../components";
import { Button, Box, useColorModeValue } from "@chakra-ui/react";

export const HomeOrg = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Box bg={bg} color={color}>
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
