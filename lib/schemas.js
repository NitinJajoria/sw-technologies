import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be under 50 characters" }),

  email: z.string().email({ message: "Please enter a valid email address" }),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit mobile number" })
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .max(100, { message: "Company name is too long" })
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(100, { message: "Subject is too long" }),

  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});
