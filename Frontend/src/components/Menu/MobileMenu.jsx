import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
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
      />
      <MenuList>
        <MenuItemOption>New Tab</MenuItemOption>
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Closed Tab</MenuItem>
        <MenuItem>Open File...</MenuItem>
      </MenuList>
    </Menu>
  );
};
