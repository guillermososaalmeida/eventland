import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
  semanticTokens: {
    colors: {
      background: {
        pressed: {
          base: { default: "blue.800", _dark: "blue.300" },
          subtle: { default: "blue.300", _dark: "blue.700" },
        },
      },
    },
  },
};

const theme = extendTheme({ config });

export default theme;
