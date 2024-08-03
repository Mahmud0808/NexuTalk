import { z } from "zod";

export const SettingsFormSchema = () =>
  z.object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" })
      .optional(),
    image: z.string().optional(),
  });
