import * as z from "zod";

export type EditUserInput = z.infer<typeof EditUserSchema>;

export const EditUserSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Name can't contain numbers or special characters except ' and -",
    ),
  position: z.string().optional(),
  email: z
    .string()
    .email("Invalid email")
    .refine((val) => !/^[0-9]/.test(val), "Email can't start with a number"),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]),
  status: z.enum(["APPROVED", "SUSPENDED", "PENDING"]),
  username: z
    .string()
    .min(3, "Username too short")
    .regex(
      /^[A-Za-z0-9-_]+$/,
      "Username can only have letters, numbers, - or _",
    ),
});
