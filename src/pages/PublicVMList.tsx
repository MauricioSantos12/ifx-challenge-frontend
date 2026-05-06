import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { vmService, VM } from "../services/vm";
import socket from "../services/socket";
import VMCard from "../components/vm/VMCard";
import AnimatedSection from "../components/common/AnimatedSection";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

export default function PublicVMList() {
  const [vms, setVms] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await vmService.getAll();
        setVms(res.data);
      } finally {
        setLoading(false);
      }
    };
    getData();

    const onCreated = (vm: VM) => {
      setVms((prev) => [...prev, vm]);
      toast({
        title: "Nueva VM creada",
        description: vm.name,
        status: "success",
        duration: 3000,
      });
    };

    const onUpdated = (vm: VM) => {
      setVms((prev) => prev.map((v) => (v.id === vm.id ? vm : v)));
      toast({
        title: "VM actualizada",
        description: vm.name,
        status: "info",
        duration: 3000,
      });
    };

    const onDeleted = ({ id }: { id: string }) => {
      setVms((prev) => prev.filter((v) => v.id !== id));
      toast({ title: "VM eliminada", status: "warning", duration: 3000 });
    };

    socket.on("vm:created", onCreated);
    socket.on("vm:updated", onUpdated);
    socket.on("vm:deleted", onDeleted);

    return () => {
      socket.off("vm:created", onCreated);
      socket.off("vm:updated", onUpdated);
      socket.off("vm:deleted", onDeleted);
    };
  }, []); // eslint-disable-line

  const activeVMs = vms.filter((vm) => vm.status === "Encendida");
  const inactiveVMs = vms.filter((vm) => vm.status === "Apagada");

  const renderGrid = (list: VM[]) =>
    list.length === 0 ? (
      <Text color="gray.500" textAlign="center" py={10}>
        No hay máquinas virtuales en esta categoría.
      </Text>
    ) : (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {list.map((vm, i) => (
          <AnimatedSection key={vm.id} delay={i * 0.05}>
            <VMCard vm={vm} />
          </AnimatedSection>
        ))}
      </SimpleGrid>
    );

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={colorMode === "light" ? "white" : "gray.900"}
    >
      <Header />
      <Box flex={1} maxW="1200px" mx="auto" w="full" p={6}>
        <Heading size="lg" mb={6}>
          Máquinas Virtuales
        </Heading>

        {loading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            <Skeleton h="160px" borderRadius="md" />
            <Skeleton h="160px" borderRadius="md" />
            <Skeleton h="160px" borderRadius="md" />
          </SimpleGrid>
        ) : (
          <Tabs colorScheme="blue" variant="enclosed">
            <TabList>
              <Tab>Todas ({vms.length})</Tab>
              <Tab>Activas ({activeVMs.length})</Tab>
              <Tab>Inactivas ({inactiveVMs.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>{renderGrid(vms)}</TabPanel>
              <TabPanel px={0}>{renderGrid(activeVMs)}</TabPanel>
              <TabPanel px={0}>{renderGrid(inactiveVMs)}</TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
