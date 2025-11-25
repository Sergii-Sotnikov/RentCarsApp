import { User } from "@/types/user";
import nextServer from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function getUserServer(): Promise<User> {
  const cookieStore = await cookies();
  console.log(cookieStore)
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getNotesServer(
  search: string,
  page: number,
  tag: string
): Promise<NoteHttpResponse> {
  const cookieStore = await cookies();

  const options = {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag !== "All" && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const { data } = await nextServer.get<NoteHttpResponse>("/notes", options);
  return data;
}

export async function fetchNoteByIdServer(noteId: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}


export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};



