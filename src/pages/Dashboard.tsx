import { useEffect, useState } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { vmService, VM } from "../services/vm";
import { userService } from "../services/user";
import { useAuth } from "../context/AuthContext";
import AnimatedSection from "../components/common/AnimatedSection";
import DoughnutChart from "../components/common/DoughnutChart";
import StatCard from "../components/common/StatCard";
import CardSkeleton from "../components/common/CardSkeleton";

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [vms, setVms] = useState<VM[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vmsRes = await vmService.getAll();
        setVms(vmsRes.data);
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

  const activeVMs = vms.filter((vm) => vm.status === "Encendida");
  const totalCores = vms.reduce((sum, vm) => sum + vm.cores, 0);
  const activeCores = activeVMs.reduce((sum, vm) => sum + vm.cores, 0);
  const totalRam = vms.reduce((sum, vm) => sum + vm.ram, 0);
  const activeRam = activeVMs.reduce((sum, vm) => sum + vm.ram, 0);
  const totalDisk = vms.reduce((sum, vm) => sum + vm.disk, 0);
  const activeDisk = activeVMs.reduce((sum, vm) => sum + vm.disk, 0);

  return (
    <>
      <Heading size="lg" mb={6}>
        Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: isAdmin ? 4 : 3 }} spacing={6} mb={8}>
        {loading ? (
          <CardSkeleton count={isAdmin ? 4 : 3} />
        ) : (
          <>
            <AnimatedSection delay={0}>
              <StatCard label="Máquinas Virtuales" value={vms.length} />
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <StatCard label="VMs Activas" value={activeVMs.length} />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <StatCard label="Total Cores" value={totalCores} />
            </AnimatedSection>
            {isAdmin && (
              <AnimatedSection delay={0.15}>
                <StatCard label="Usuarios" value={userCount} />
              </AnimatedSection>
            )}
          </>
        )}
      </SimpleGrid>

      {!loading && (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <AnimatedSection delay={0.2}>
            <DoughnutChart title="Cores" active={activeCores} total={totalCores} />
          </AnimatedSection>
          <AnimatedSection delay={0.25}>
            <DoughnutChart title="RAM" active={activeRam} total={totalRam} unit="GB" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <DoughnutChart title="Disco" active={activeDisk} total={totalDisk} unit="GB" />
          </AnimatedSection>
        </SimpleGrid>
      )}
    </>
  );
}
