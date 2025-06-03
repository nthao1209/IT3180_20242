"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, placeholder }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setError("Vui lòng đăng nhập để gửi bình luận");
      console.error("No user session found");
      return;
    }
    if (!content.trim()) {
      setError("Bình luận không được để trống");
      console.error("Comment content is empty");
      return;
    }

    try {
      console.log("Submitting comment:", content);
      await onSubmit(content.trim());
      setContent("");
      setError("");
    } catch (err: any) {
      const errorMessage = err.message || "Gửi bình luận thất bại, vui lòng thử lại";
      setError(errorMessage);
      console.error("Error submitting comment:", errorMessage);
    }
  };

  return (
    <div className="mb-4">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || "Viết bình luận..."}
          rows={3}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={!session?.user}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
