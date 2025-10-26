import * as z from "zod";
import validator from "validator";

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .transform((val) => validator.escape(val.trim())),
    email: z
        .string()
        .email("Invalid email format")
        .transform((val) => validator.normalizeEmail(val.trim()) || ""),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine((val) => validator.isStrongPassword(val, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }), {
            message: "Password must include uppercase, lowercase, number, and symbol"
        })
        .transform((val) => validator.escape(val.trim())),
    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine((val) => validator.isStrongPassword(val, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }), {
            message: "Password must include uppercase, lowercase, number, and symbol"
        })
        .transform((val) => validator.escape(val.trim())),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const VerificationSchema = z.object({
    pin: z.string().min(6, {
        message: "Please enter a valid 6-digit OTP",
    }),
})

export const LoginSchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .transform((val) => validator.normalizeEmail(val.trim()) || ""),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .transform((val) => validator.escape(val.trim())),
});


export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type VerificationSchemaType = z.infer<typeof VerificationSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;