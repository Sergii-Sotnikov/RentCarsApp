
import { ServerApi } from "@/app/api/api";
import { BrandsResponse, CarsResponse } from "@/types/car";



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




