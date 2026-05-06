import { Skeleton } from "@chakra-ui/react";

interface Props {
  height?: string;
  count?: number;
}

export default function CardSkeleton({ height = "100px", count = 1 }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} h={height} borderRadius="lg" />
      ))}
    </>
  );
}
