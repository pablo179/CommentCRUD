import React from "react";
import CommentsSection from "@/components/CommentSection";
import CommentForm from "@/components/CommentForm";
import { CommentsProvider } from "@/provider/commentsProvider";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-slate-100 p-3">
      <div className="mx-auto w-1/2 max-w-96 flex flex-col items-centerjustify-start h-full p-3 bg-white rounded-md text-sm">
        <h1 className="border-b text-xl" >Comments</h1>
        <CommentsProvider>
          <CommentForm />
          <CommentsSection />
        </CommentsProvider>
      </div>
    </div>
  );
}
