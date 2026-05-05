import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  Alert,
  AlertIcon,
  Center,
  Box,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnimatedSection from "../components/common/AnimatedSection";
import Footer from "../layout/Footer";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailInvalid = touched.email && !email;
  const passwordInvalid = touched.password && !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) return;

    setLoading(true);
    setError("");
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" direction="column">
      <Flex flex={1}>
        <Center flex={1} bg="blue.800" display={{ base: "none", md: "flex" }}>
          <Image
            src="/logo.svg"
            alt="Logo"
            maxW="200px"
            fallback={
              <Heading
                color="white"
                size={{ base: "lg", md: "xl", lg: "2xl" }}
                textAlign={"center"}
                w="100%"
              >
                VM Manager Challenge
              </Heading>
            }
          />
        </Center>

        <Center
          flex={1}
          bg={colorMode === "light" ? "white" : "gray.900"}
          px={6}
        >
          <AnimatedSection>
            <Card w="full" maxW="400px" boxShadow="lg">
              <CardBody>
                <Box as="form" onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <Heading size="lg">Iniciar Sesión</Heading>
                    {error && (
                      <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                      </Alert>
                    )}

                    <FormControl isInvalid={emailInvalid}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, email: true }))
                        }
                        placeholder="correo@ejemplo.com"
                      />
                      {emailInvalid && (
                        <FormErrorMessage>
                          El email es requerido
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={passwordInvalid}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, password: true }))
                        }
                        placeholder="••••••••"
                      />
                      {passwordInvalid && (
                        <FormErrorMessage>
                          La contraseña es requerida
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <Text
                      fontSize={"sm"}
                      color={"gray.400"}
                      textAlign={"left"}
                      w="100%"
                    >
                      Admin: admin@ifx.com / Password: Admin123!{" "}
                    </Text>

                    <Text
                      fontSize={"sm"}
                      color={"gray.400"}
                      textAlign={"left"}
                      w="100%"
                    >
                      Cliente: cliente@ifx.com / Password: Cliente123!{" "}
                    </Text>

                    <Button
                      type="submit"
                      variant="primary"
                      w="full"
                      isLoading={loading}
                    >
                      Ingresar
                    </Button>
                  </VStack>
                </Box>
              </CardBody>
            </Card>
          </AnimatedSection>
        </Center>
      </Flex>
      <Footer />
    </Flex>
  );
}
