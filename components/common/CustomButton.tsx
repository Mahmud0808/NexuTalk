import { ReactNode } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

export type ButtonTypes = "submit" | "reset" | "button" | undefined;

interface CustomButtonProps {
  type: ButtonTypes;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  secondary?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const CustomButton = ({
  type,
  disabled = false,
  fullWidth = false,
  secondary = false,
  danger = false,
  onClick,
  children,
}: CustomButtonProps) => {
  const buttonStyle = clsx(
    `bg-primary hover:bg-primary-dark text-white`,
    fullWidth && "w-full",
    danger && "bg-red-500 hover:bg-red-600",
    secondary && "text-slate-900 bg-white hover:bg-slate-100/80"
  );

  if (onClick) {
    return (
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonStyle}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button type={type} disabled={disabled} className={buttonStyle}>
        {children}
      </Button>
    );
  }
};

export default CustomButton;
