import { Card, CardBody, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  title: string;
  active: number;
  total: number;
  unit?: string;
}

export default function DoughnutChart({ title, active, total, unit }: Props) {
  const inactive = total - active;
  const label = unit ? `${title} (${active} / ${total} ${unit})` : `${title} (${active} / ${total})`;

  const data = {
    labels: ["Activo", "Inactivo"],
    datasets: [
      {
        label: title,
        data: [active, inactive],
        backgroundColor: ["#2B6CB0", "#CBD5E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: { position: "bottom" as const },
    },
  };

  return (
    <Card shadow="md" borderRadius="lg">
      <CardBody>
        <Heading size="sm" textAlign="center" mb={4}>
          {label}
        </Heading>
        <Doughnut data={data} options={options} />
      </CardBody>
    </Card>
  );
}
