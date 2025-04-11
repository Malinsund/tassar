import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Comment {
  username: string;
  text: string;
}
interface CommentProps {
  comments: Comment[];
}

const CommentBubble: React.FC<CommentProps> = ({ comments }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComments = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={toggleComments}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
        <span>{comments.length} Kommentarer</span>
      </button>

      {isOpen && (
        <div className="mt-2 p-2 bg-slate-50 dark:text-black rounded-lg">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} className="text-sm pb-2 text-gray-700">
                <strong>@{comment.username}: </strong>
                {comment.text}
              </p>
            ))
          ) : (
            <p>inga kommentarer än.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default CommentBubble;
