import { Button, ButtonGroup, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const DesktopMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const { logoutOrg, organization } = useOrgAuth();
  return (
    <>
      <ButtonGroup flexWrap="nowrap">
        <Button background="transparent" transition="0.3s">
          <Link to="/login">Iniciar sesión</Link>
        </Button>
        <Button background="transparent" transition="0.3s">
          <Link to="/register">Registrarse</Link>
        </Button>
        <Button background="transparent" transition="0.3s">
          <Link to="/registerorg">Crea tus eventos</Link>
        </Button>
        <Button background="transparent" transition="0.3s">
          <Link to="/loginorg">Inicia sesión como organizadorx</Link>
        </Button>
      </ButtonGroup>
      <Button
        border="none"
        p="5"
        rounded="3"
        transition="0.3s"
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>

      {(user || organization) && (
        <Button
          background="transparent"
          border="none"
          p="5"
          rounded="3"
          transition="0.3s"
          color="red"
          onClick={user ? logout : logoutOrg}
        >
          Logout
        </Button>
      )}
    </>
  );
};
