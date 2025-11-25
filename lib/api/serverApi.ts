
import { Car, CarsResponse } from "@/types/car";
import nextServer from "./api";
import { headers } from "next/headers";




export async function getCarsServer(
  brand: string,
  rentalPrice: string,
  minMileage: string,
  maxMileage: string,
  limit: string,
  page: string,
): Promise<CarsResponse> {

  const options = {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit,
      page,
    },
    headers: {
      accept: 'application/json',
    },
  };

  const { data } = await nextServer.get<CarsResponse>("/cars", options);
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
 const { data } = await nextServer.get<Car>("/cars/", options);
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




