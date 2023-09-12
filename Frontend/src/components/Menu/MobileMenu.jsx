import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export const MobileMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white, blackAlpha.300");
  const color = useColorModeValue("blackAlpha.600, white");

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
          background={bg}
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
          color={color}
        >
          <Link to="/registerorg">Crea tus eventos</Link>
        </MenuItem>
        <MenuItem
          /* background={bg} */
          border="none"
          _hover={{
            background: "#ebeceeff",
          }}
          p="5"
          rounded="3"
          transition="0.5s"
          /* color={color} */
        >
          <Link to="/loginorg">Inicia sesión como organizadorx</Link>
        </MenuItem>

        <MenuItem
          background={bg}
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
          onClick={toggleColorMode}
          color={color}
        >
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
