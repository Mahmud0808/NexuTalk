import { z } from "zod";

const memberSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const GroupChatFormSchema = () =>
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    members: z.array(memberSchema),
  });
