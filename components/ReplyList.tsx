interface Reply {
  reply_id: number;
  user: { name: string };
  content: string;
  created_at: string;
}

interface ReplyListProps {
  replies: Reply[];
}

export default function ReplyList({ replies }: ReplyListProps) {
  return (
    <div className="ml-6 border-l pl-4 mt-2">
      {replies.map((reply) => (
        <div key={reply.reply_id} className="mb-2">
          <div className="text-sm font-semibold">{reply.user.name}</div>
          <div>{reply.content}</div>
          <div className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
