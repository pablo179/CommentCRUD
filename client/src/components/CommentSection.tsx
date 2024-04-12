"use client";
import { useState } from "react";
import { useProvider } from "@/provider/commentsProvider";
import useLoading from "@/hooks/useLoading";

const commentButton =
  " text-xs text-sky-500 p-1 mx-1 rounded-md hover:text-white hover:bg-sky-500";

const CommentsSection = () => {
  const { comments, deleteComment, updateComment } = useProvider();
  const { LoadingSwitch, load } = useLoading();
  const [isEditComment, setIsEditComment] = useState<number | null>(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedComment, setEditedComment] = useState("");

  const handleEdit = (id: number, email: string, comment: string) => () => {
    setIsEditComment(id);
    setEditedEmail(email);
    setEditedComment(comment);
  };

  const handleDelete = (id: number) => async () => {
    await load(deleteComment(id));
  };

  const handleSaveEdit = async () => {
    if (!editedEmail || !editedComment || !isEditComment) return;
    await load(updateComment(isEditComment, editedEmail, editedComment));
    setIsEditComment(null);
    setEditedEmail("");
    setEditedComment("");
  };

  const handleCancelEdit = () => {
    setIsEditComment(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEmail(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-3">
      {comments.map(({ id, comment, email }) => {
        return id === isEditComment ? (
          <div key={id} className="w-full p-2 flex flex-col">
            <input
              className="h-7"
              onChange={handleEmailChange}
              value={editedEmail}
            />
            <textarea
              className="h-16 mt-2"
              onChange={handleCommentChange}
              value={editedComment}
            />
            <LoadingSwitch>
              <div>
                <button onClick={handleSaveEdit} className={commentButton}>
                  Save
                </button>
                <button onClick={handleCancelEdit} className={commentButton}>
                  Cancel
                </button>
              </div>
            </LoadingSwitch>
          </div>
        ) : (
          <div key={id} className="w-full border-b p-1">
            <p className="text-xs font-semibold">{email}</p>
            <p className="text-slate-700 m-1 whitespace-pre-wrap">{comment}</p>
            <LoadingSwitch>
              <button onClick={handleDelete(id)} className={commentButton}>
                Delete
              </button>
              <button
                onClick={handleEdit(id, email, comment)}
                className={commentButton}
              >
                Edit
              </button>
            </LoadingSwitch>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsSection;
