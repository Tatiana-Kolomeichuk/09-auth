'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useId } from "react";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { NewNote, TagNote } from "@/types/note";
import { useDraft } from "@/lib/store/noteStore";


export default function NoteForm() {
  const id = useId();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useDraft();

  const createMutation = useMutation({
    mutationFn:async (data: NewNote) => {
      const res = await createNote(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      handleCancel();
    },
  });

  function change(
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const data = { ...draft, [ev.target.name]: ev.target.value };
    setDraft(data);
  } 

  function handleSubmit(formDada: FormData) {
    const newNote: NewNote = {
      title: formDada.get('title') as string,
      content: formDada.get('content') as string,
      tag: formDada.get('tag') as TagNote,
    };
    createMutation.mutate(newNote);
  }

  const router = useRouter();
  
   function handleCancel() {
    router.back();
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          onChange={change}
          type="text"
          id={`${id}-title`}
          name="title"
          className={css.input}
          required
          value={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          onChange={change}
          id={`${id}-content`}
          name="content"
          className={css.textarea}
          rows={8}
          value={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          onChange={change}
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={handleCancel} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}