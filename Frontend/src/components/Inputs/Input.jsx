import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const InputHeader = () => {
  const navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value;
      name ? navigate(`/eventlist/${name}`) : navigate("/eventlist/");
    }
  };

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none" p="5">
          <SearchIcon color="gray" />
        </InputLeftElement>
        <Input
          minW="15em"
          w="100%"
          h="2.5em"
          type="text"
          placeholder="Busca eventos"
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
          onKeyDown={handleEnter}
        />
      </InputGroup>
    </>
  );
};
