import { z } from "zod";

export const acceptMessageSchema = z.object({
  isMatchWin: z.boolean(),
  highestScore: z.number().min(0),
});
