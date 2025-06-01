import { useState } from "react";
import ReplyList from "./ReplyList";
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

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: number, content: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (content: string) => {
    onReply(comment.comment_id, content);
    setShowReplyForm(false);
  };

  return (
    <div className="border p-3 rounded mb-3">
      <div className="font-semibold">{comment.user.name}</div>
      <div className="mb-1">{comment.content}</div>
      <div className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</div>
      <button
        className="text-sm text-blue-600 mt-2"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        {showReplyForm ? "Hủy trả lời" : "Trả lời"}
      </button>

      {showReplyForm && <CommentForm onSubmit={handleReply} placeholder="Viết trả lời..." />}

      <ReplyList replies={comment.replies} />
    </div>
  );
}
