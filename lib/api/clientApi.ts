
import { Car } from "@/types/car";
import nextServer from "./api";


export async function fetchNoteByIdUser(id:string) {
  const {data}= await nextServer.get<Car>(`/cars/${id}`)
  return data
}

