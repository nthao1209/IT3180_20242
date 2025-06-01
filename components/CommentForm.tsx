"use client";

import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, placeholder }: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || "Viết bình luận..."}
        rows={3}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Gửi
      </button>
    </form>
  );
}
