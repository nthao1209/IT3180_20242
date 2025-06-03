"use client";

import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";

interface Reply {
  reply_id: number;
  user: { name: string };
  content: string;
  created_at: string;
}

interface Comment {
  comment_id: number;
  user: { name: string; user_id: number };
  content: string;
  created_at: string;
  replies: Reply[];
}

export default function CommentList({ bookId }: { bookId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchComments = async () => {
    if (!bookId || isNaN(bookId)) {
      setError("Invalid book ID");
      console.error(`Invalid bookId: ${bookId}`);
      return;
    }

    try {
      console.log(`Fetching comments for bookId: ${bookId}`);
      const res = await fetch(`/api/comments?bookId=${bookId}`, { cache: "no-store" });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Failed to fetch comments, status: ${res.status}, response:`, text);
        throw new Error(`Failed to fetch comments (status: ${res.status}): ${text.slice(0, 100)}`);
      }
      const data = await res.json();
      // Đảm bảo created_at là chuỗi
      const formattedComments = data.map((comment: any) => ({
        ...comment,
        created_at: new Date(comment.created_at).toISOString(),
        replies: comment.replies.map((reply: any) => ({
          ...reply,
          created_at: new Date(reply.created_at).toISOString(),
        })),
      }));
      console.log("Comments fetched:", JSON.stringify(formattedComments, null, 2));
      setComments(formattedComments);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching comments:", err.message);
      setError(err.message || "Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const addComment = async (content: string) => {
    if (!session?.user) {
      setError("You must be logged in to comment");
      console.error("No user session found");
      return;
    }
    try {
      console.log("Adding comment:", { bookId, content, userId: session.user.id });
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, content, userId: Number(session.user.id) }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Failed to add comment, status: ${res.status}, response:`, text);
        throw new Error(`Failed to add comment (status: ${res.status}): ${text.slice(0, 100)}`);
      }
      await fetchComments();
    } catch (err: any) {
      console.error("Error adding comment:", err.message);
      setError(err.message || "Failed to add comment");
    }
  };

  const addReply = async (commentId: number, content: string) => {
    if (!session?.user) {
      setError("You must be logged in to reply");
      console.error("No user session found");
      return;
    }
    try {
      console.log("Adding reply:", { commentId, content, userId: session.user.id });
      const res = await fetch("/api/comments/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, content, userId: Number(session.user.id) }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Failed to add reply, status: ${res.status}, response:`, text);
        throw new Error(`Failed to add reply (status: ${res.status}): ${text.slice(0, 100)}`);
      }
      await fetchComments();
    } catch (err: any) {
      console.error("Error adding reply:", err.message);
      setError(err.message || "Failed to add reply");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-3">Bình luận ({comments.length})</h3>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {session?.user ? (
        <CommentForm onSubmit={addComment} placeholder="Viết bình luận..." />
      ) : (
        <p className="text-sm text-gray-600 mb-4">
          <a href={`/auth/signin?callbackUrl=/book/${bookId}`} className="text-blue-500">
            Đăng nhập
          </a>{" "}
          để gửi bình luận
        </p>
      )}
      <div className="mt-4">
        {comments.length === 0 && !error ? (
          <p className="text-gray-500">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              onReply={addReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
