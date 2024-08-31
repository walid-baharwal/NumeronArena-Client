import { z } from "zod";

export const messageSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
