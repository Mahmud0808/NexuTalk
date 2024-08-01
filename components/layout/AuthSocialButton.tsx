import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  text?: string;
  onClick: () => void;
  disabled?: boolean;
}

const AuthSocialButton = ({
  icon: Icon,
  text = "",
  onClick,
  disabled = false,
}: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex w-full justify-center items-center gap-2 rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <Icon />
      <span className="max-md:hidden text-sm">&nbsp;{text}</span>
    </button>
  );
};

export default AuthSocialButton;
