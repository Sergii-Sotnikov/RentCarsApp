import CarDetailsClient from "@/components/CarDetailsClient/CarDetailsClient";
import { getCarByIdServer } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type CarsDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function CarDetails({ params }: CarsDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => getCarByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient id={id} />
    </HydrationBoundary>
  );
}
