import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import DesktopMenuItem from "./DesktopMenuItem";

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
      <ButtonGroup flexWrap="nowrap">
        <Button background="transparent" transition="0.3s">
          {!user && !organization ? login : profile}
        </Button>

        <Button background="transparent" transition="0.3s">
          {!user && !organization ? register : myEvents}
        </Button>

        <div>{switchMode}</div>
      </ButtonGroup>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          m="5"
          border="none"
          background="transparent"
          color="gray"
        />
        <MenuList m="2" border="1px solid gray" rounded="3">
          <DesktopMenuItem onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </DesktopMenuItem>
          {(user || organization) && (
            <DesktopMenuItem color="red" onClick={user ? logout : logoutOrg}>
              Logout
            </DesktopMenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
