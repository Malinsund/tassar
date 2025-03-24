interface SecondaryButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
  disabled?: boolean;
}

export default function SecondaryButton({
  onClick,
  type = "button",
  text,
  className = "",
  disabled = false,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-grey50 text-white font-special font-semibold text-lg p-2 rounded-lg ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
