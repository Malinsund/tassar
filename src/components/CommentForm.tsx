import { useState } from "react";

const CommentForm = ({
  onAddComment,
}: {
  onAddComment: (comment: string) => void;
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mt-4">
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        className="w-full p-2 rounded-lg border border-gray-300"
        placeholder="Kommentera..."
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Lägg till
      </button>
    </form>
  );
};

export default CommentForm;
