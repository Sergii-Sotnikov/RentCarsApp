"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarByIdClient } from "@/lib/api/clientApi";
import type { Car } from "@/types/car";

type CarDetailsClientProps = {
  id: string;
};

export default function CarDetailsClient({ id }: CarDetailsClientProps) {
  const { data: car, isLoading, isError, error } = useQuery<Car>({
    queryKey: ["car", id],
    queryFn: () => getCarByIdClient(id) 
  });

  if (isLoading && !car) return <p>Завантаження авто…</p>;
  if (isError) return <p style={{ color: "red" }}>Сталася помилка: {(error as Error)?.message}</p>;
  if (!car) return <p>Авто не знайдено.</p>;

  return (
    <section>
      <h1>{car.brand} {car.model}</h1>
      {/* остальная инфа */}
    </section>
  );
}
