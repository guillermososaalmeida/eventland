import { Box, useColorModeValue } from "@chakra-ui/react";
export const FigureOrg = ({ organization }) => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Box bg={bg} color={color}>
      <figure className="dataProfile">
        <img src={organization?.image} alt="organization image" />
        <h4>Email: {organization?.email}</h4>
      </figure>
    </Box>
  );
};
