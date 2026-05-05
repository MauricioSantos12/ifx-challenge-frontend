import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { userService, UserRecord, UserPayload } from "../../services/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: UserRecord | null;
  onSuccess: () => void;
}

const initialForm: UserPayload = {
  email: "",
  password: "",
  role: "Cliente",
};

function UserFormContent({ user, onClose, onSuccess }: Omit<Props, "isOpen">) {
  const toast = useToast();
  const isEdit = Boolean(user);
  const [form, setForm] = useState<UserPayload>(
    user ? { email: user.email, role: user.role, password: "" } : initialForm
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof UserPayload, string>>>({});

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "El email es requerido";
    if (!isEdit && !form.password?.trim()) e.password = "La contraseña es requerida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = { ...form };
      if (isEdit && !payload.password) delete payload.password;

      if (isEdit && user) {
        await userService.update(user.id, payload);
        toast({ title: "Usuario actualizado", status: "success", duration: 2000 });
      } else {
        await userService.create(payload);
        toast({ title: "Usuario creado", status: "success", duration: 2000 });
      }
      onSuccess();
      onClose();
    } catch {
      toast({ title: "Error al guardar", status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContent>
      <ModalHeader>{isEdit ? "Editar Usuario" : "Crear Usuario"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={form.email} onChange={handleChange} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>{isEdit ? "Contraseña (dejar vacío para no cambiar)" : "Contraseña"}</FormLabel>
            <Input name="password" type="password" value={form.password} onChange={handleChange} />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Rol</FormLabel>
            <Select name="role" value={form.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Cliente">Cliente</option>
            </Select>
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" isLoading={loading} onClick={handleSubmit}>
          {isEdit ? "Actualizar" : "Crear"}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default function UserModal({ isOpen, onClose, user, onSuccess }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {isOpen && (
        <UserFormContent
          key={user?.id ?? "new"}
          user={user}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
}
