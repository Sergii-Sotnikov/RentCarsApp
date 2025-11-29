"use client";

import Link from "next/link";
import type { Car } from "@/types/car";
import css from "./CarItem.module.css"
import Image from "next/image";

type CarItemProps = {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function CarItem({ car, isFavorite, onToggleFavorite }: CarItemProps) {
      const formatLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const city = parts[1] || "";
    const country = parts[2] || "";
    return `${city} | ${country} | ${car.rentalCompany} |`;
  };
  return (
    <li className={css.item}>
<div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
        />
      </div>
      <div className={css.info}>
        <h3 className={css.title}>
          {car.brand} <span className={css.carModel}>{car.model}</span>,
          <span className={css.carYear}>{car.year}</span>
          <span className={css.carPrice}>${car.rentalPrice}</span>
        </h3>
        <div className={css.details}>
          <span className={css.location}>{formatLocation(car.address)}</span>
          <span className={css.typeMileage}>
            {car.type} | {car.mileage?.toLocaleString()} km
          </span>
        </div>
      </div>
      <Link
        href={`/cars/${car.id}`}
        className={css.readMoreLink}
        aria-label={`View details about ${car.brand} ${car.model}`}
      >
        Read more
      </Link>
    </li>
  );
}
