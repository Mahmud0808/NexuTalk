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
        `bg-primary hover:bg-primary-dark text-white`,
        fullWidth && "w-full",
        danger && "bg-red-500 hover:bg-red-600",
        secondary && "text-slate-900 bg-white hover:bg-slate-100/80"
      )}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
