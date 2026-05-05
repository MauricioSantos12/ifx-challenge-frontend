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
import { userService, UserRecord } from "../services/user";
import UserCard from "../components/user/UserCard";
import UserModal from "../components/user/UserModal";
import ConfirmModal from "../components/common/ConfirmModal";
import AnimatedSection from "../components/common/AnimatedSection";

export default function UserList() {
  const { isAdmin } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch {
      toast({
        title: "Error al cargar usuarios",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error(error);
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
    setSelectedUser(null);
    onOpen();
  };

  const handleEdit = (user: UserRecord) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await userService.delete(deleteId);
      toast({ title: "Usuario eliminado", status: "success", duration: 2000 });
      fetchUsers();
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
        <Heading size="lg">Usuarios</Heading>
        {isAdmin && (
          <Button
            leftIcon={<FiPlus />}
            variant="primary"
            onClick={handleCreate}
          >
            Crear Usuario
          </Button>
        )}
      </HStack>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} h="120px" borderRadius="md" />
          ))}
        </SimpleGrid>
      ) : users.length === 0 ? (
        <Text color="gray.500" textAlign="center" py={10}>
          No hay usuarios registrados.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {users.map((u, i) => (
            <AnimatedSection key={u.id} delay={i * 0.05}>
              <UserCard
                user={u}
                showActions={isAdmin}
                onEdit={() => handleEdit(u)}
                onDelete={() => setDeleteId(u.id)}
              />
            </AnimatedSection>
          ))}
        </SimpleGrid>
      )}

      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
        onSuccess={fetchUsers}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </Box>
  );
}
