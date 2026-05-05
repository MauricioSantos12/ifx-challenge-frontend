import { Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      textAlign="center"
      py={4}
      px={6}
      fontSize="sm"
      bg="blue.800"
      color="white"
      borderTop={"1px solid"}
      borderColor="gray.500"
    >
      © {new Date().getFullYear()} VM Manager. Todos los derechos reservados.
    </Box>
  );
}
