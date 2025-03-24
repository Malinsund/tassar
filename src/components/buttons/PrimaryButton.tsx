interface PrimaryButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
  disabled?: boolean;
  /* lägga till Variant */
}

export default function PrimaryButton({
  onClick,
  type = "button",
  text,
  className = "",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-primary text-white font-special font-semibold text-lg p-2 rounded-lg ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
