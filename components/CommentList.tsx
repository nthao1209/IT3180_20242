import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface Reply {
  reply_id: number;
  user: { name: string };
  content: string;
  created_at: string;
}

interface Comment {
  comment_id: number;
  user: { name: string };
  content: string;
  created_at: string;
  replies: Reply[];
}

export default function CommentList({ bookId }: { bookId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`/api/comments?bookId=${bookId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(console.error);
  }, [bookId]);

  const addComment = async (content: string) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, content }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const addReply = async (commentId: number, content: string) => {
    const res = await fetch("/api/comments/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, content }),
    });
    if (res.ok) {
      const newReply = await res.json();
      setComments((prev) =>
        prev.map((c) =>
          c.comment_id === commentId
            ? { ...c, replies: [...c.replies, newReply] }
            : c
        )
      );
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-3">Bình luận</h3>
      <CommentForm onSubmit={addComment} />
      <div className="mt-4">
        {comments.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} onReply={addReply} />
        ))}
      </div>
    </div>
  );
}
