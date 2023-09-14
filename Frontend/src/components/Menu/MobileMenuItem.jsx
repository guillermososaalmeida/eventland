import { MenuItem } from "@chakra-ui/react";

export const MobileMenuItem = ({ children, ...args }) => {
  return (
    <MenuItem
      border="none"
      _hover={{ background: "#ebeceeff" }}
      p="5"
      rounded="3"
      transition="0.3s"
      {...args}
    >
      {children}
    </MenuItem>
  );
};
