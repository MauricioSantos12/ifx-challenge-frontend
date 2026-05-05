import { Box, Button, Text } from "@chakra-ui/react";
import AnimatedSection from "../components/common/AnimatedSection";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      gap={4}
    >
      <AnimatedSection>
        <Text fontSize="6xl" fontWeight="bold" color={"white"}>
          404
        </Text>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Text fontSize="xl" color="white">
          Page not found
        </Text>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          Go home
        </Button>
      </AnimatedSection>
    </Box>
  );
}
