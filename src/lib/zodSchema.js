import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const reminderFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(30, { message: "Title must not exceed 30 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(100, { message: "Description must not exceed 100 characters." }),
  remindAt: z.date().refine((date) => date > new Date(), {
    message: "Reminder time must be set in the future.",
  }),
});
