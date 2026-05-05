import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { vmService, VM } from "../services/vm";
import VMCard from "../components/vm/VMCard";
import VMModal from "../components/vm/VMModal";
import ConfirmModal from "../components/common/ConfirmModal";
import AnimatedSection from "../components/common/AnimatedSection";

export default function VMList() {
  const { isAdmin } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vms, setVms] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVM, setSelectedVM] = useState<VM | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fetchVMs = async () => {
    setLoading(true);
    try {
      const res = await vmService.getAll();
      setVms(res.data);
    } catch {
      toast({ title: "Error al cargar VMs", status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchVMs();
      } catch (err) {
        console.error(err);
        toast({
          title: "Error de conexión",
          description: "No se pudieron cargar las máquinas virtuales",
          status: "error",
          duration: 3000,
        });
      }
    };
    getData();
  }, []); // eslint-disable-line
  const handleCreate = () => {
    setSelectedVM(null);
    onOpen();
  };

  const handleEdit = (vm: VM) => {
    setSelectedVM(vm);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await vmService.delete(deleteId);
      toast({ title: "VM eliminada", status: "success", duration: 2000 });
      fetchVMs();
    } catch {
      toast({ title: "Error al eliminar", status: "error", duration: 3000 });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Máquinas Virtuales</Heading>
        {isAdmin && (
          <Button
            leftIcon={<FiPlus />}
            variant="primary"
            onClick={handleCreate}
          >
            Crear VM
          </Button>
        )}
      </HStack>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} h="160px" borderRadius="md" />
          ))}
        </SimpleGrid>
      ) : vms.length === 0 ? (
        <Text color="gray.500" textAlign="center" py={10}>
          No hay máquinas virtuales disponibles.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {vms.map((vm, i) => (
            <AnimatedSection key={vm.id} delay={i * 0.05}>
              <VMCard
                vm={vm}
                showActions={isAdmin}
                onEdit={() => handleEdit(vm)}
                onDelete={() => setDeleteId(vm.id)}
              />
            </AnimatedSection>
          ))}
        </SimpleGrid>
      )}

      <VMModal
        isOpen={isOpen}
        onClose={onClose}
        vm={selectedVM}
        onSuccess={fetchVMs}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message="¿Estás seguro de que deseas eliminar esta VM?"
      />
    </Box>
  );
}
