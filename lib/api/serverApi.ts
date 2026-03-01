import { cookies } from "next/headers";
import { nextServer } from "./api";
import { FetchTagNote, Note } from "@/types/note";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: FetchTagNote;
}
export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}


export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const res = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function checkSession() {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}