
import { NextServer } from "@/app/api/api";
import { Car, CarsResponse } from "@/types/car";
import { headers } from "next/headers";

export type GetCarsParams = {
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  page: number;
  limit?: number;
};


export async function getCarsServer(params: GetCarsParams): Promise<CarsResponse> {

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

  const { data } = await NextServer.get<CarsResponse>("/cars", options);
  return data;
}


export async function fetchCarByIdServer(id:string) {
  const options = {
    params: {
      id
    },
    headers: {
      accept: 'application/json',
    },
  }
 const { data } = await NextServer.get<Car>("/cars/", options);
  return data;
}


// https://car-rental-api.goit.global/cars?brand=volvo&rentalPrice=40&minMileage=0&maxMileage=10000&limit=10&page=1'

// export async function fetchNoteByIdServer(noteId: string) {
//   const cookieStore = await cookies();
//   const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return data;
// }




