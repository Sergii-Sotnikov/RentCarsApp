"use client";

import { useEffect } from "react";
import type { CatalogFilters, CarsResponse, Car } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";
import { useCarsInfinite } from "@/lib/hooks/useCarsInfinite";
import CarsList from "../CarsList/CarsList";
import LoadMoreSection from "../LoadMoreSection/LoadMoreSection";


type CatalogClientProps = {
  initialFilters: CatalogFilters;
  initialPage?: CarsResponse;
};

export default function CatalogClient({
  initialFilters,
  initialPage,
}: CatalogClientProps) {
  const cars = useCatalogStore((state) => state.cars);
  const favoritesCars = useCatalogStore((state) => state.favoritesCars);
  const setFilters = useCatalogStore((state) => state.setFilters);
  const toggleFavorite = useCatalogStore((state) => state.toggleFavorite);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, setFilters]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useCarsInfinite(initialPage, initialFilters);

  if (isError) {
    return (
      <p style={{ color: "red" }}>
        Сталася помилка: {(error as Error)?.message}
      </p>
    );
  }

  if (isLoading && cars.length === 0) {
    return <p>Завантаження автомобілів…</p>;
  }

  const noCarsFound =
    !isLoading && data && data.pages.every((page) => page.cars.length === 0);

  return (
    <section>
      <CarsList
        cars={cars}
        favoritesCars={favoritesCars}
        onToggleFavorite={toggleFavorite}
        noCarsFound={noCarsFound}
      />

      <LoadMoreSection
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        hasCars={cars.length > 0}
        onFetchNextPage={fetchNextPage}
      />
    </section>
  );
}
