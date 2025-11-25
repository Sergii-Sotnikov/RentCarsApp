"use client";

import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNoteByIdUser } from "@/lib/api/clientApi";

const NoteDetailsClient = () => {

    const {id} = useParams<{id: string}>()
    const {data:note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: ()=> fetchNoteByIdUser(id),
        refetchOnMount: false,
    })

    if (isLoading) {
      return <Loader/>
    }

    if (error || !note) {
      return <ErrorMessage/>
    }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient
