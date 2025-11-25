'use client'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNoteByIdUser } from "@/lib/api/clientApi";

export default function CarDetailsClient() {
    
    const {id} = useParams<{id:string}>()
    const {data:car, isLoading, error} = useQuery({
        queryKey: ['car', id],
        queryFn: ()=> fetchNoteByIdUser(id),
        refetchOnMount: false,
    })
    
    if (isLoading) {
      return <Loader/>
    }

    if (error || !car) {
      return <ErrorMessage/>
    }

    
    
    
    return(
        <div>
            CarDetailsClient
             <p>year {car.year}</p>
             <p>brand {car.brand}</p>
             <p>model {car.model}</p>
        </div>
    )
}