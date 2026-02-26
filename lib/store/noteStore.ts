import { NewNote } from "@/types/note";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface NoteDraft {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraft = create<NoteDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (newDraft) => set(() => ({ draft: newDraft })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
