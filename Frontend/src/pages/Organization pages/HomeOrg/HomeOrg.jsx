import { Link } from "react-router-dom";

import { OrgNextEvents, OrgPastEvents } from "../../../components";
import { Button } from "@chakra-ui/react";

export const HomeOrg = () => {
  return (
    <>
      <div>
        <Link to="/createeventorg">
          <Button>Create Event</Button>
        </Link>
      </div>
      <OrgNextEvents />
      <OrgPastEvents />
    </>
  );
};
