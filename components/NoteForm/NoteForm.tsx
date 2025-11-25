"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NewNote } from "@/types/note";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";
import { useState, type ChangeEvent } from "react";
import { createNoteUser } from "@/lib/api/clientApi";
import { ApiError } from "@/types/apiError";

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Too Long!")
    .required("Title is required"),
  content: Yup.string().max(500, "Too Long!"),
  tag: Yup.string()
    .oneOf([
    "All",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
    "Todo"
  ], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm() {
  const tags = [
    "All",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
    "Todo"
  ];
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createNoteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note added");
      clearDraft();
      router.back();
    },
    onError(error) {
      const errorMessage = 
                    (error as ApiError).response?.data?.error ??
                      (error as ApiError).message ??
                      'Oops... some error';
    setError(errorMessage)
    toast.error(errorMessage)
    },

  });

  const handleCancel = () => router.back();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutate(values);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...(draft as NewNote),
      [e.target.name as keyof NewNote]: e.target.value,
    });
  };

  return (
    <>
    <Toaster position="top-center" />
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft.content}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating" : "Create"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
        </>
  );
}
