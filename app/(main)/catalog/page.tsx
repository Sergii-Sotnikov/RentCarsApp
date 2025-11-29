import { getCarsServer } from "@/lib/api/serverApi";
import CatalogClient from "@/components/CatalogClient/CatalogClient";


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
  const { brand, rentalPrice, minMileage, maxMileage, page } = await searchParams;

  const filters = {
    brand: brand || undefined,
    rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
    minMileage: minMileage ? Number(minMileage) : undefined,
    maxMileage: maxMileage ? Number(maxMileage) : undefined,
  };

  const currentPage = page ? Number(page) : 1;

  const firstPage = await getCarsServer({
    ...filters,
    page: currentPage,
    limit: 12,
  });


  return (
    <>
      <CatalogClient
        initialFilters={filters}
        initialPage={firstPage}
      />
    </>
  );
}
