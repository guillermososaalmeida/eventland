import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export const MobileMenu = () => {
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
          background="white"
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
        >
          New Tab
        </MenuItem>
        <MenuItem
          background="white"
          border="none"
          _hover={{
            background: "#ebeceeff",
          }}
          p="5"
          rounded="3"
          transition="0.5s"
        >
          New Window
        </MenuItem>
        <MenuItem
          background="white"
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
        >
          Open Closed Tab
        </MenuItem>
        <MenuItem
          background="white"
          border="none"
          _hover={{ background: "#ebeceeff" }}
          p="5"
          rounded="3"
          transition="0.3s"
        >
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
