import { FetchTagNote, Note } from "@/types/note";
import { nextServer } from "./api";
import { User, UserReg } from "@/types/user";

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

export type CreateNotePayload = {
  title: string;
  content: string;
  tag: string;
};

interface UpdateUser {
  email: string;
  username: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(data: UserReg): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: UserReg): Promise<User> {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
}
export async function logout() {
  const res = await nextServer.post('/auth/logout');
  return res.data;
}
export async function checkSession() {
  const res = await nextServer.get('/auth/session');
  return res.data;
}

export async function updateMe(data: UpdateUser): Promise<User> {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
}