import { getBrandsServer } from "@/lib/api/serverApi";
import FiltersSidebar from "@/components/FiltersSidebar/FiltersSidebar";

export default async function CatalogFiltersPage() {
  const brands = await getBrandsServer();

  return <FiltersSidebar brandsOptions={brands} />;
}