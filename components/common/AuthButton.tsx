import { ReactNode } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

export type ButtonTypes = "submit" | "reset" | "button" | undefined;

interface AuthButtonProps {
  type: ButtonTypes;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  secondary?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const AuthButton = ({
  type,
  disabled = false,
  fullWidth = false,
  secondary = false,
  danger = false,
  onClick,
  children,
}: AuthButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        `bg-accent dark:bg-accent hover:bg-accent-dark dark:hover:bg-accent-dark text-white dark:text-white`,
        fullWidth && "w-full",
        danger && "bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600",
        secondary && "text-text bg-bg dark:bg-bg hover:bg-slate-100/80 dark:hover:bg-gray-900/80"
      )}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
