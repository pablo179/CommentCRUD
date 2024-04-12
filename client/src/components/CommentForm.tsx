"use client";
import React, { useCallback } from "react";
import { useProvider } from "@/provider/commentsProvider";
import useLoading from "@/hooks/useLoading";

const CommentForm = () => {
  const { addComment } = useProvider();
  const { LoadingSwitch, load } = useLoading();
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const email = form.elements.namedItem("email") as HTMLInputElement;
      const comments = form.elements.namedItem("comments") as HTMLInputElement;
      if (!email.value || !comments.value) return;
      await load(addComment(email.value, comments.value));
      form.reset();
    },
    [addComment, load]
  );
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-end w-full border-b py-2"
    >
      <label className="flex flex-row items-center w-full h-10 px-3">
        Email:
        <input
          required
          type="email"
          name="email"
          className="w-full ml-2 h-7"
        />
      </label>
      <label className="w-full px-3">
        Comment:
        <textarea
          required
          name="comments"
          className="w-full h-16"
        />
      </label>
      <LoadingSwitch>
        <button
          type="submit"
          className="w-20 h-6 bg-blue-500 text-white rounded-md mt-2 mr-3"
        >
          Submit
        </button>
      </LoadingSwitch>
    </form>
  );
};

export default CommentForm;
