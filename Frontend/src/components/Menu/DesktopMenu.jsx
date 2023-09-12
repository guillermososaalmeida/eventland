import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const DesktopMenu = () => {
  return (
    <>
      <ButtonGroup>
        <Button
          background="transparent"
          transition="0.3s"
          _hover={{ background: "#ebeceeff" }}
        >
          <Link to="/login">Iniciar sesión</Link>
        </Button>
        <Button
          background="transparent"
          transition="0.3s"
          _hover={{ background: "#ebeceeff" }}
        >
          <Link to="/register">Registrarse</Link>
        </Button>
        <Button
          background="transparent"
          transition="0.3s"
          _hover={{ background: "#ebeceeff" }}
        >
          <Link to="/registerorg">Crea tus eventos</Link>
        </Button>
        <Button
          background="transparent"
          transition="0.3s"
          _hover={{ background: "#ebeceeff" }}
        >
          <Link to="/loginorg">Inicia sesión como organizadorx</Link>
        </Button>
      </ButtonGroup>
    </>
  );
};
