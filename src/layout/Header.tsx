import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { User } from "../services/auth";

interface HeaderProps {
  isMobile: boolean | undefined;
  onOpen: () => void;
  colorMode: string;
  toggleColorMode: () => void;
  user: User | null;
}

export default function Header({
  isMobile,
  onOpen,
  colorMode,
  toggleColorMode,
  user,
}: HeaderProps) {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={6}
      py={3}
      bg="blue.800"
      color="white"
      borderBottom="1px solid"
      borderColor="gray.500"
    >
      {isMobile ? (
        <IconButton
          aria-label="Abrir menú"
          icon={<FiMenu />}
          onClick={onOpen}
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
      ) : (
        <Box />
      )}
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
        <Box fontSize="sm">{user?.email}</Box>
      </HStack>
    </Flex>
  );
}
