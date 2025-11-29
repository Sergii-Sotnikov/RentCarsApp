"use client";

import type { Car } from "@/types/car";
import CarItem from "../CarItem/CarItem";
import css from "./CarsList.module.css";

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
  const columns = 4;
  const remainder = cars.length % columns;
  const placeholdersCount = remainder === 0 ? 0 : columns - remainder;

  return (
    <>
      {noCarsFound && <p>За обраними фільтрами авто не знайдено.</p>}

      <ul className={css.list}>
        {cars.map((car) => {
          const isFavorite = favoritesCars.includes(car.id);
          return (
            <CarItem
              key={car.id}
              car={car}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}

{Array.from({ length: placeholdersCount }).map((_, index) => (
  <li key={`placeholder-${index}`} className={css.placeholder} />
))}
      </ul>
    </>
  );
}
