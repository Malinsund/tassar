import { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

const CommentForm = ({
  onAddComment,
  username,
}: {
  onAddComment: (comment: string, username: string) => void;
  username: string;
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddComment(comment, username);
    setComment("");
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mt-4">
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        className="w-full p-2 mb-3 rounded-lg border border-gray-300"
        placeholder="Kommentera..."
      />
      <PrimaryButton type="submit" text="lägg till" />
    </form>
  );
};

export default CommentForm;
