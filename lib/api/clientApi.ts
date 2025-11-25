import { CreateUserData, RegistedUser, User } from "@/types/user";
import nextServer from "./api";
import { SessionRespData } from "@/types/session";
import { NewNote, Note } from "@/types/note";

 interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}


export async function RegisteredUser(payload: CreateUserData) {
  const { data } = await nextServer.post<User>("/auth/register",payload);
  return data;
}


export async function loginUser(payload: RegistedUser) {
  const { data } = await nextServer.post<User>("/auth/login", payload);
  return data;
}

export async function outUser() {
  await nextServer.post<User>("/auth/logout");
}

export async function getUser(): Promise<User | null> {
  const { data } = await nextServer.get<User>("/users/me", {withCredentials: true});
  return data;
}


export async function editUser(dataUser: { username: string }) {
  const { data } = await nextServer.patch<User>("/users/me", dataUser);
  return data;
}

export async function checkSessionUser() {
    const { data } = await nextServer.get<SessionRespData>("/auth/session");
   return data.success;
}


export async function getNotesUser(search: string, page: number, tag:string): Promise<NoteHttpResponse> {
  const options = {
    params: {
      page,
      perPage: 12,
      ...(search && { search}),
      ...(tag !== "All" && { tag }),
    }
  };

  const {data} = await nextServer.get<NoteHttpResponse>("/notes", options);
  return data;
}

export async function deleteNoteUser(noteId: string){
    const {data} = await nextServer.delete<Note>(`/notes/${noteId}`)
    return data;
}

export async function createNoteUser(values: NewNote): Promise<Note> {
    const {data} = await nextServer.post<Note>("/notes", values)
    return data;
}


export async function fetchNoteByIdUser(noteId:string) {
  const {data}= await nextServer.get<Note>(`/notes/${noteId}`)
  return data
}

