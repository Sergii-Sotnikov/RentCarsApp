import { getBrandsServer, getCarsServer } from "@/lib/api/serverApi";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
import FiltersSidebar from "@/components/FiltersSidebar/FiltersSidebar";

type CatalogSearchParams = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
};

type CatalogProps = {
  searchParams: CatalogSearchParams;
};

export default async function Catalog({ searchParams }: CatalogProps) {
  const { brand, rentalPrice, minMileage, maxMileage, page } = searchParams;

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

  const brands = await getBrandsServer();

  return (
    <>
      <FiltersSidebar brandsOptions={brands} />
      <CatalogClient
        initialFilters={filters}
        initialPage={firstPage}
        brandsOptions={brands}
      />
    </>
  );
}
