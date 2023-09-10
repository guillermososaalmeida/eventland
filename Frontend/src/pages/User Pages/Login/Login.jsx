import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <Link to="/forgotpassword/forgotpassword">Forgot Password</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/home">Home</Link>
    </div>
  );
};
