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
import { vmService, VM, VMPayload } from "../../services/vm";

const initialForm: VMPayload = {
  name: "",
  cores: 1,
  ram: 1,
  disk: 10,
  os: "",
  status: "Apagada",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vm?: VM | null;
  onSuccess: () => void;
}

function VMFormContent({ vm, onClose, onSuccess }: Omit<Props, "isOpen">) {
  const toast = useToast();
  const isEdit = Boolean(vm);
  const [form, setForm] = useState<VMPayload>(
    vm
      ? { name: vm.name, cores: vm.cores, ram: vm.ram, disk: vm.disk, os: vm.os, status: vm.status }
      : initialForm
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof VMPayload, string>>>({});

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "El nombre es requerido";
    if (form.cores < 1) e.cores = "Mínimo 1 core";
    if (form.ram < 1) e.ram = "Mínimo 1 GB";
    if (form.disk < 1) e.disk = "Mínimo 1 GB";
    if (!form.os.trim()) e.os = "El SO es requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: ["cores", "ram", "disk"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit && vm) {
        await vmService.update(vm.id, form);
        toast({ title: "VM actualizada", status: "success", duration: 2000 });
      } else {
        await vmService.create(form);
        toast({ title: "VM creada", status: "success", duration: 2000 });
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
      <ModalHeader>{isEdit ? "Editar VM" : "Crear VM"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cores}>
            <FormLabel>Cores</FormLabel>
            <Input name="cores" type="number" min={1} value={form.cores} onChange={handleChange} />
            <FormErrorMessage>{errors.cores}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.ram}>
            <FormLabel>RAM (GB)</FormLabel>
            <Input name="ram" type="number" min={1} value={form.ram} onChange={handleChange} />
            <FormErrorMessage>{errors.ram}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.disk}>
            <FormLabel>Disco (GB)</FormLabel>
            <Input name="disk" type="number" min={1} value={form.disk} onChange={handleChange} />
            <FormErrorMessage>{errors.disk}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.os}>
            <FormLabel>Sistema Operativo</FormLabel>
            <Input name="os" value={form.os} onChange={handleChange} />
            <FormErrorMessage>{errors.os}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Estado</FormLabel>
            <Select name="status" value={form.status} onChange={handleChange}>
              <option value="Encendida">Encendida</option>
              <option value="Apagada">Apagada</option>
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

export default function VMModal({ isOpen, onClose, vm, onSuccess }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {isOpen && (
        <VMFormContent
          key={vm?.id ?? "new"}
          vm={vm}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
}
