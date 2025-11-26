import { getCarsServer } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/queryClient/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CatalogProps = {
  searchParams: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
    page?: string;
  };
};

export default async function Catalog({ searchParams }: CatalogProps) {
  const queryClient = getQueryClient();

  const { brand, rentalPrice, minMileage, maxMileage, page } = searchParams;
  const filters = {
    brand: brand || undefined,
    rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
    minMileage: minMileage ? Number(minMileage) : undefined,
    maxMileage: maxMileage ? Number(maxMileage) : undefined,
    page: page ? Number(page) : 1,
  };

  await queryClient.prefetchQuery({
    queryKey: ["cars", { ...filters, page: 1 }],
    queryFn: () => getCarsServer({ ...filters, page: 1 }),
  });

  return (
        <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient initialFilters={filters} />
    </HydrationBoundary>
  );
}
