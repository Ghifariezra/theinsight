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
    tokenOTP: z.string().min(1, "Invalid OTP token").optional(),
    exp: z.number().optional(),
});

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