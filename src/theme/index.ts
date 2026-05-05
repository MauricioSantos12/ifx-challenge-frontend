import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    blue: "#1A365D", // blue.800
    black: "#000000",
    white: "#FFFFFF",
  },
};

const fonts = {
  heading: `'Space Grotesk', sans-serif`,
  body: `'Space Grotesk', sans-serif`,
};

const Button = {
  baseStyle: {
    borderRadius: "md",
    fontWeight: "600",
  },
  variants: {
    primary: {
      bg: "blue.800",
      color: "white",
      _hover: { bg: "black" },
      _active: { bg: "blue.900" },
    },
    outline: {
      border: "2px solid",
      borderColor: "blue.800",
      color: "blue.800",
      _hover: { bg: "blue.800", color: "white" },
    },
    ghost: {
      color: "white",
      _hover: { bg: "whiteAlpha.200" },
    },
    danger: {
      bg: "red.500",
      color: "white",
      _hover: { bg: "red.600" },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};

const config = {
  initialColorMode: "light" as const,
  useSystemColorMode: false,
};

const Card = {
  baseStyle: (props: { colorMode: string }) => ({
    container: {
      bg: props.colorMode === "dark" ? "gray.800" : "white",
      borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
    },
  }),
};

const Input = {
  variants: {
    outline: (props: { colorMode: string }) => ({
      field: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        borderColor: props.colorMode === "dark" ? "gray.600" : "gray.200",
        _placeholder: {
          color: props.colorMode === "dark" ? "gray.400" : "gray.500",
        },
      },
    }),
  },
};

const Modal = {
  baseStyle: (props: { colorMode: string }) => ({
    dialog: {
      bg: props.colorMode === "dark" ? "gray.800" : "white",
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
    }),
  },
  components: {
    Button,
    Card,
    Input,
    Modal,
  },
});

export default theme;
