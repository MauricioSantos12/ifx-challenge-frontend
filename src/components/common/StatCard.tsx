import { Card, CardBody, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface Props {
  label: string;
  value: number | string;
}

export default function StatCard({ label, value }: Props) {
  return (
    <Card shadow="md" borderRadius="lg">
      <CardBody>
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{value}</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  );
}
