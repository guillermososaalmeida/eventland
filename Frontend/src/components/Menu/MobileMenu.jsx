import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MobileMenuItem } from "./MobileMenuItem";

export const MobileMenu = ({
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
        <MobileMenuItem>
          {!user && !organization ? login : profile}
        </MobileMenuItem>

        <MobileMenuItem>
          {!user && !organization ? register : myEvents}
        </MobileMenuItem>

        <MobileMenuItem>{switchMode}</MobileMenuItem>
        <MobileMenuItem onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </MobileMenuItem>

        {(user || organization) && (
          <MobileMenuItem color="red" onClick={user ? logout : logoutOrg}>
            Logout
          </MobileMenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
