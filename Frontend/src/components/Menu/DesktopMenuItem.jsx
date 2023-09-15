import { Button } from "@chakra-ui/react";

const DesktopMenuItem = ({ children, ...args }) => {
  return (
    <Button border="none" p="5" rounded="3" transition="0.3s" {...args}>
      {children}
    </Button>
  );
};

export default DesktopMenuItem;
