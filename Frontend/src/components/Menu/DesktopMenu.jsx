import { Button, ButtonGroup, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import DesktopMenuItem from "./DesktopMenuItem";

export const DesktopMenu = ({ switchMode, login, register, profile }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const { logoutOrg, organization } = useOrgAuth();
  return (
    <>
      <ButtonGroup flexWrap="nowrap">
        <Button background="transparent" transition="0.3s">
          {!user && !organization ? login : profile}
        </Button>
        <Button background="transparent" transition="0.3s">
          {register}
        </Button>
        <Button background="transparent" transition="0.3s">
          {switchMode}
        </Button>
      </ButtonGroup>
      <DesktopMenuItem onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </DesktopMenuItem>

      {(user || organization) && (
        <DesktopMenuItem color="red" onClick={user ? logout : logoutOrg}>
          Logout
        </DesktopMenuItem>
      )}
    </>
  );
};
