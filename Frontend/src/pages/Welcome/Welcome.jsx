import { Link } from "react-router-dom";
import { Header, Input } from "../../components";
import { CiSearch } from "react-icons/ci";
import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <Header>
        <div>
          <img
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1694439036/proyectoEventland/assets/OIG_gsdzjv.jpg"
            alt="Eventland logo"
            className="logo"
          />
        </div>
        <div>
          <CiSearch />
          <Input placeholder="Buscar" h="30px" w="120px" />
        </div>
      </Header>
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
