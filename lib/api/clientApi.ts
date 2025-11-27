"use client";

import { GetCarsParams } from "./serverApi";
import { Car, CarsResponse } from "@/types/car";
import { apiClient } from "./api";


export async function getCarsClient(params: GetCarsParams): Promise<CarsResponse> {

  const {brand, rentalPrice, minMileage, maxMileage, page, limit} = params;
  const options = {
    params: {
      ...(brand && { brand }),
      ...(rentalPrice !== undefined && { rentalPrice }),
      ...(minMileage !== undefined && { minMileage }),
      ...(maxMileage !== undefined && { maxMileage }),
      limit: limit,
      page,
    },
    headers: {
      accept: 'application/json',
    },
  };

  const { data } = await apiClient.get<CarsResponse>("/cars", options);
  return data;
}


export async function getCarByIdClient(id:string) {
 const { data } = await apiClient.get<Car>(`/cars/${id}`);
return data;
}
