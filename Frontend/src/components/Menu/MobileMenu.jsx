import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
export const MobileMenu = () => {
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
        <MenuItem
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
        >
          <Link to="/registerorg">Crea tus eventos</Link>
        </MenuItem>
        <MenuItem
          border="none"
          _hover={{
            background: "#ebeceeff",
          }}
          p="5"
          rounded="3"
          transition="0.5s"
        >
          <Link to="/loginorg">Inicia sesión como organizadorx</Link>
        </MenuItem>

        <MenuItem
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </MenuItem>

        {(user || organization) && (
          <MenuItem
            border="none"
            _hover={{ background: "#ebeceeff" }}
            p="5"
            rounded="3"
            transition="0.3s"
            color="red"
            onClick={user ? logout : logoutOrg}
          >
            Logout
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
