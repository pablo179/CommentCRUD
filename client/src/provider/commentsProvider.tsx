"use client"
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type CommentType = {
  id: number;
  email: string;
  comment: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CommentsContext = createContext<{
  comments: CommentType[];
  addComment: (email: string, comment: string) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  updateComment: (id: number, comment: string, emal: string) => Promise<void>;
} | undefined>(undefined);

export const useProvider = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};

export const CommentsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!Array.isArray(data)) {
        return;
      }
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (email: string, comment: string) => {
    try {
      await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, comment }),
      });
      await fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  const updateComment = async (id: number, email: string, comment: string) => {
    try {
      await fetch(`${BASE_URL}/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, email }),
      });
      await fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CommentsContext.Provider value={{ comments, addComment, deleteComment, updateComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
