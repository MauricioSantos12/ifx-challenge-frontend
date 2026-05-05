import { useEffect, useState } from "react";
import {
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
} from "@chakra-ui/react";
import { vmService } from "../services/vm";
import { userService } from "../services/user";
import { useAuth } from "../context/AuthContext";
import AnimatedSection from "../components/common/AnimatedSection";

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [vmCount, setVmCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vmsRes = await vmService.getAll();
        setVmCount(vmsRes.data.length);
        if (isAdmin) {
          const usersRes = await userService.getAll();
          setUserCount(usersRes.data.length);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  return (
    <>
      <Heading size="lg" mb={6}>
        Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {loading ? (
          <>
            <Skeleton h="100px" borderRadius="lg" />
            {isAdmin && <Skeleton h="100px" borderRadius="lg" />}
          </>
        ) : (
          <>
            <AnimatedSection delay={0}>
              <Card shadow="md" borderRadius="lg">
                <CardBody>
                  <Stat>
                    <StatLabel>Máquinas Virtuales</StatLabel>
                    <StatNumber>{vmCount}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </AnimatedSection>
            {isAdmin && (
              <AnimatedSection delay={0.1}>
                <Card shadow="md" borderRadius="lg">
                  <CardBody>
                    <Stat>
                      <StatLabel>Usuarios</StatLabel>
                      <StatNumber>{userCount}</StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
              </AnimatedSection>
            )}
          </>
        )}
      </SimpleGrid>
    </>
  );
}
