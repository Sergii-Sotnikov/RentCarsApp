import { getCarsServer } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/queryClient/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CatalogSearchParams = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
};

type CatalogProps = {
  searchParams: Promise<CatalogSearchParams>;
};

export default async function Catalog({ searchParams }: CatalogProps) {
  const queryClient = getQueryClient();

  const {brand, rentalPrice ,minMileage, maxMileage, page} = await searchParams;
  const filters = {
    brand: brand || undefined,
    rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
    minMileage: minMileage ? Number(minMileage) : undefined,
    maxMileage: maxMileage ? Number(maxMileage) : undefined,
    page: page ? Number(page) : 1,
  };

  await queryClient.prefetchQuery({
    queryKey: ["cars", { ...filters, page: 1 }],
    queryFn: () => getCarsServer({ ...filters, page: 1, limit: 12}),
  });

  return (
        <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <CatalogClient initialFilters={filters} /> */}
    </HydrationBoundary>
  );
}
