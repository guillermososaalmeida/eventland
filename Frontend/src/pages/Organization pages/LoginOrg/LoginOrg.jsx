import { Link } from "react-router-dom";

export const LoginOrg = () => {
  return (
    <div>
      <Link to="/homeorg">Home Organization</Link>
      <br />
      <Link to="/registerorg">Register Organization</Link>
    </div>
  );
};
