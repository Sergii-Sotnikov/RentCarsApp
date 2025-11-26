
import { Car } from "@/types/car";
import { api } from "./api";


export async function fetchNoteByIdUser(id:string) {
  const {data}= await api.get<Car>(`/cars/${id}`)
  console.log(data)
  return data
}

