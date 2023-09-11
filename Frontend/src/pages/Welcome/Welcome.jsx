import { Link } from "react-router-dom";

import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/registerorg">Register Organization</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/loginorg">Login Organization</Link>
    </>
  );
};
