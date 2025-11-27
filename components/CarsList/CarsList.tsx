"use client";

import Link from "next/link";
import type { Car } from "@/types/car";

type CarsListProps = {
  cars: Car[];
  favoritesCars: string[];
  onToggleFavorite: (id: string) => void;
  noCarsFound: boolean;
};

export default function CarsList({
  cars,
  favoritesCars,
  onToggleFavorite,
  noCarsFound,
}: CarsListProps) {
  return (
    <>
      {noCarsFound && <p>За обраними фільтрами авто не знайдено.</p>}

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          listStyle: "none",
          padding: 0,
        }}
      >
        {cars.map((car) => {
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
              <Link
                href={`/catalog/${car.id}`} // если у тебя роут /catalog/[id]
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
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
              </Link>

              <button
                type="button"
                onClick={() => onToggleFavorite(car.id)}
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
    </>
  );
}
