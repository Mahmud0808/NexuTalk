import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AuthVariant = "LOGIN" | "REGISTER";

export const AuthFormSchema = (type: AuthVariant) =>
  z.object({
    // sign-up
    userName: type === "REGISTER" ? z.string().optional() : z.string().min(5),
    // both
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
