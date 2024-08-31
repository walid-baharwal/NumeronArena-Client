import { z } from "zod";

export const usernameValidation = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, { message: "Username must be at least 5 characters long" })
  .max(20, { message: "Username must not be more than 20 characters long" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Username must not conatain special characters",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(30, { message: "Full name must not be more than 30 characters long" }),
  email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
