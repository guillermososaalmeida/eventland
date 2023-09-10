import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/check">Check Code</Link>
    </div>
  );
};
