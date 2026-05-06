import { Button, Flex, Heading, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={6}
      py={3}
      bg="blue.800"
      color="white"
    >
      <Heading size="sm" cursor="pointer" onClick={() => navigate("/vms")}>
        VM Manager
      </Heading>
      <HStack spacing={3}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
        <Button
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </Button>
      </HStack>
    </Flex>
  );
}
