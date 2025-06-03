"use client";

import { SessionProvider } from "next-auth/react";
import CommentList from "./CommentList";

interface CommentListWrapperProps {
  bookId: number;
}

export default function CommentListWrapper({ bookId }: CommentListWrapperProps) {
  return (
    <SessionProvider>
      <CommentList bookId={bookId} />
    </SessionProvider>
  );
}
