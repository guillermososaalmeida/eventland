import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export const InputHeader = () => {
  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none" p="5">
          <SearchIcon color="gray" />
        </InputLeftElement>
        <Input
          h="2.5em"
          type="text"
          placeholder="Buscar"
          pl="3em"
          pt="1"
          rounded="40"
          border="solid 1px #90a4ae"
          fontSize="15"
          fontFamily="sans-serif"
          letterSpacing="2px"
          fontWeight={"100"}
          transition="0.3s"
          _hover={{ border: "solid 1px black" }}
        />
      </InputGroup>
    </>
  );
};
