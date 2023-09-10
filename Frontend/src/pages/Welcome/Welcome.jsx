import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/registerorg">Register Organization</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/loginorg">Login Organization</Link>
    </div>
  );
};
