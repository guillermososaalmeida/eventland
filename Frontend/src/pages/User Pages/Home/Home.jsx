import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/eventdetail/:id">Event Detail</Link>
      <br />
      <Link to="/citydetail/:id">City Detail</Link>
    </div>
  );
};
