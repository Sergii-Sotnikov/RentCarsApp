
import NoteDetailsClient from "./NotePreview.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";


type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:['note', id],
    queryFn: ()=> fetchNoteByIdServer(id),
  })


  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
      </HydrationBoundary>
  )
  

};

export default NoteDetails;
