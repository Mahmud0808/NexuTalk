import { ReactNode } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

export type ButtonTypes = "submit" | "reset" | "button" | undefined;

interface CustomButtonProps {
  type: ButtonTypes;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const CustomButton = ({
  type,
  disabled = false,
  fullWidth = false,
  children,
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={clsx(`bg-primary hover:bg-primary-dark text-white`, fullWidth && "w-full")}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
