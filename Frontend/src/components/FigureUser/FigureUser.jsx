import { Box, useColorModeValue } from "@chakra-ui/react";
export const FigureUser = (user) => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Box bg={bg} color={color}>
      <figure className="dataProfile">
        <img src={user.user.image} alt="user image" className="imageUser" />
        <h4 className="emailUser">Email: {user.user.email}</h4>
      </figure>
    </Box>
  );
};
