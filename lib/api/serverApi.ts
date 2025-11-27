
import { ServerApi } from "@/app/api/api";
import { BrandsResponse, Car, CarsResponse } from "@/types/car";



export type GetCarsParams = {
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  page: number;
  limit?: number;
};


export async function getCarsServer(params: GetCarsParams): Promise<CarsResponse> {

  const {brand, rentalPrice, minMileage, maxMileage, page, limit = 12} = params;
  const options = {
    params: {
      ...(brand && { brand }),
      ...(rentalPrice !== undefined && { rentalPrice }),
      ...(minMileage !== undefined && { minMileage }),
      ...(maxMileage !== undefined && { maxMileage }),
      limit,
      page,
    },
    headers: {
      accept: 'application/json',
    },
  };

  const { data } = await ServerApi.get<CarsResponse>("/api/cars", options);
  return data;
}

export async function getBrandsServer() {
  const {data} = await ServerApi.get<BrandsResponse>("/api/brands");
  return data
}


export async function getCarByIdServer(id: string) {
  const { data } = await ServerApi.get<Car>(`/api/cars/${id}`)
  return data;
}




