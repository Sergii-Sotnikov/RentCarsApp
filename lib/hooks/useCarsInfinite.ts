import { useInfiniteQuery } from "@tanstack/react-query";
import { getCarsClient } from "../api/clientApi";
import { useCatalogStore } from "../store/catalogStore";
import { CarsResponse } from "@/types/car";
import { useEffect } from "react";

export function useCarsInfinite(initialPage?: CarsResponse) {
  const { filters, setCars } = useCatalogStore();
  const { brand, rentalPrice, minMileage, maxMileage } = filters;

  const query = useInfiniteQuery<CarsResponse>({
    queryKey: ["cars", { brand, rentalPrice, minMileage, maxMileage }],
    queryFn: ({ pageParam = 1 }) =>
      getCarsClient({
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        page: pageParam as number,
        limit: 12,
      }),
    initialPageParam: 1,
    initialData: initialPage
      ? {
          pages: [initialPage],
          pageParams: [1],
        }
      : undefined,

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const currentPage = (lastPageParam as number) ?? 1;
      if (currentPage >= lastPage.totalPages) return undefined;

      return currentPage + 1; // 1 -> 2 -> 3 -> ...
    },
  });

  useEffect(() => {
    if (!query.data) return;
    const allCars = query.data.pages.flatMap((page) => page.cars);
    setCars(allCars);
  }, [query.data, setCars]);

  return query;
}
