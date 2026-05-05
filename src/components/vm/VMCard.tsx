import {
  Badge,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { VM } from "../../services/vm";

interface Props {
  vm: VM;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function VMCard({ vm, showActions, onEdit, onDelete }: Props) {
  const { colorMode } = useColorMode();
  const subtextColor = colorMode === "light" ? "gray.600" : "gray.300";

  return (
    <Card shadow="md" borderRadius="lg">
      <CardBody>
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Heading size="sm">{vm.name}</Heading>
            <Badge colorScheme={vm.status === "Encendida" ? "green" : "red"}>
              {vm.status}
            </Badge>
          </HStack>
          <Text fontSize="sm" color={subtextColor}>
            OS: {vm.os}
          </Text>
          <Text fontSize="sm" color={subtextColor}>
            {vm.cores} Cores • {vm.ram} GB RAM • {vm.disk} GB Disco
          </Text>
          {showActions && (
            <HStack spacing={2} pt={2}>
              <IconButton
                aria-label="Editar"
                icon={<FiEdit2 />}
                size="sm"
                variant="outline"
                color={colorMode === "light" ? "gray.800" : "white"}
                borderColor={colorMode === "light" ? "gray.800" : "white"}
                _hover={{
                  bgColor: colorMode === "light" ? "blue.800" : "gray.300",
                  color: colorMode === "light" ? "white" : "gray.800",
                }}
                onClick={onEdit}
              />
              <IconButton
                aria-label="Eliminar"
                icon={<FiTrash2 />}
                size="sm"
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
                onClick={onDelete}
              />
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}
