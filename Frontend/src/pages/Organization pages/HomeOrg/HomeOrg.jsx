import { Link } from "react-router-dom";

import { OrgNextEvents, OrgPastEvents } from "../../../components";

export const HomeOrg = () => {
  return (
    <>
      <div>
        <Link to="/organizationprofile">Organization Profile</Link>
        <br />
        <Link to="/createeventorg">Create Event</Link>
        <br />
        <Link to="/eventdetailorg">Event Detail de Organización</Link>
      </div>
      <OrgNextEvents />
      <OrgPastEvents />
    </>
  );
};
