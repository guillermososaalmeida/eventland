import { Button, ButtonGroup, Icon, useColorMode } from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AiOutlineLogout } from "react-icons/ai";

export const DesktopMenu = ({
  switchMode,
  login,
  register,
  profile,
  myEvents,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const { logoutOrg, organization } = useOrgAuth();
  return (
    <>
      <ButtonGroup
        flexWrap="nowrap"
        justifyContent="space-between"
        w="60vw"
        gap="1em"
      >
        <Button background="transparent" transition="0.3s">
          {!user && !organization ? login : profile}
        </Button>

        <Button background="transparent" transition="0.3s">
          {!user && !organization ? register : myEvents}
        </Button>

        <div>{switchMode}</div>

        <Button onClick={toggleColorMode} bg="transparent">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        {/*  {(user || organization) && ( */}
        <Button
          color="red"
          onClick={user ? logout : logoutOrg}
          bg="transparent"
        >
          <Icon as={AiOutlineLogout} />
        </Button>
        {/*   )}  */}
      </ButtonGroup>
    </>
  );
};
