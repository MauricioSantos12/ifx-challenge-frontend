import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  VStack,
  Icon,
  IconButton,
  useColorMode,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiMonitor, FiUsers, FiHome, FiLogOut, FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

const NAV_ITEMS = [
  { label: "Dashboard", icon: FiHome, path: "/dashboard", adminOnly: false },
  { label: "VMs", icon: FiMonitor, path: "/dashboard/vms", adminOnly: false },
  { label: "Users", icon: FiUsers, path: "/dashboard/users", adminOnly: true },
];

function SidebarContent({
  isAdmin,
  pathname,
  navigate,
  onLogout,
}: {
  isAdmin: boolean;
  pathname: string;
  navigate: (path: string) => void;
  onLogout: () => void;
}) {
  return (
    <Flex direction="column" justify="space-between" h="full" py={6} px={4}>
      <VStack spacing={4} align="stretch">
        <Heading size="sm" mb={4} textAlign="center">
          VM Manager
        </Heading>
        {NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin).map((item) => (
          <Button
            key={item.path}
            leftIcon={<Icon as={item.icon} />}
            variant="ghost"
            justifyContent="flex-start"
            size="sm"
            bg={pathname === item.path ? "whiteAlpha.200" : "transparent"}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      <VStack spacing={2} align="stretch">
        <Button
          leftIcon={<Icon as={FiLogOut} />}
          size="sm"
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={onLogout}
        >
          Salir
        </Button>
      </VStack>
    </Flex>
  );
}

export default function AppLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  return (
    <Flex minH="100vh">
      {!isMobile && (
        <Flex
          as="aside"
          direction="column"
          w="220px"
          bg="blue.800"
          color="white"
          borderRight="1px solid"
          borderColor="gray.500"
        >
          <SidebarContent
            isAdmin={isAdmin}
            pathname={location.pathname}
            navigate={handleNavigate}
            onLogout={handleLogout}
          />
        </Flex>
      )}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="blue.800" color="white">
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <SidebarContent
              isAdmin={isAdmin}
              pathname={location.pathname}
              navigate={handleNavigate}
              onLogout={handleLogout}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex
        flex={1}
        direction="column"
        bg={colorMode === "light" ? "white" : "gray.900"}
        overflowY="auto"
      >
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

        <Box flex={1} p={6}>
          <Outlet />
        </Box>

        <Footer />
      </Flex>
    </Flex>
  );
}
