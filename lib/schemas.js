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

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const quoteSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  serviceRequired: z.enum([
    "Website Design",
    "Website Development",
    "E-Commerce Development",
    "SEO & Digital Marketing",
    "Other",
  ]),
  budget: z.enum([
    "Under ₹25K",
    "₹25K–₹50K",
    "₹50K–₹1L",
    "₹1L+",
    "Let's discuss",
  ]),
  message: z.string().max(500).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
