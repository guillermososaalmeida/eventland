import { MenuItem } from "@chakra-ui/react";

const DesktopMenuItem = ({ children, ...args }) => {
  return (
    <MenuItem border="none" p="5" rounded="3" transition="0.3s" {...args}>
      {children}
    </MenuItem>
  );
};

export default DesktopMenuItem;
