"use client";

import { useEffect, ChangeEvent } from "react";
import type { CatalogFilters, CarsResponse, Car, BrandsResponse } from "@/types/car";
import { useCatalogStore } from "@/lib/store/catalogStore";
import { useCarsInfinite } from "@/lib/hooks/useCarsInfinite";

type CatalogClientProps = {
  initialFilters: CatalogFilters,
  initialPage?: CarsResponse;
  brandsOptions: BrandsResponse;
};

export default function CatalogClient({ initialFilters, initialPage, brandsOptions }: CatalogClientProps) {
  const filters = useCatalogStore(state => state.filters);
  const cars = useCatalogStore(state => state.cars);
  const favoritesCars = useCatalogStore(state => state.favoritesCars);
  const setFilters = useCatalogStore(state => state.setFilters);
  const toggleFavorite = useCatalogStore(state => state.toggleFavorite);

  useEffect(() => {
    setFilters(initialFilters);
  }, [
    initialFilters.brand,
    initialFilters.rentalPrice,
    initialFilters.minMileage,
    initialFilters.maxMileage,
    setFilters,
  ]);

  const {
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


  return (
    <section>
      {/* ===== СПИСОК АВТО ===== */}
      {cars.length === 0 && !isLoading && (
        <p>За обраними фільтрами авто не знайдено.</p>
      )}

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          listStyle: "none",
          padding: 0,
        }}
      >
        {cars.map((car: Car) => {
          const isFavorite = favoritesCars.includes(car.id);

          return (
            <li
              key={car.id}
              style={{
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>
                {car.brand} {car.model}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
                {car.year} • {car.type}
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
                Пробіг: {car.mileage} км
              </p>
              <p style={{ margin: 0, fontWeight: 600 }}>
                Ціна: {car.rentalPrice} / доба
              </p>

              <button
                type="button"
                onClick={() => toggleFavorite(car.id)}
                style={{
                  marginTop: "auto",
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid #ff9800",
                  backgroundColor: isFavorite ? "#ff9800" : "transparent",
                  color: isFavorite ? "#fff" : "#ff9800",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {isFavorite ? "Видалити з обраних" : "Додати в обрані"}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ===== LOAD MORE ===== */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #1976d2",
              backgroundColor: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              opacity: isFetchingNextPage ? 0.7 : 1,
            }}
          >
            {isFetchingNextPage ? "Завантаження..." : "Load more"}
          </button>
        )}

        {!hasNextPage && cars.length > 0 && (
          <p style={{ marginTop: 8, color: "#777" }}>
            Це всі авто за цими фільтрами.
          </p>
        )}

        {isFetching && !isFetchingNextPage && (
          <p style={{ marginTop: 8, color: "#777" }}>Оновлення даних…</p>
        )}
      </div>
    </section>
  );
}
