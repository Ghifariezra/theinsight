import * as z from "zod";
import validator from "validator";

export const WriteSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .transform((val) => validator.escape(val.trim())),
    description: z
        .string()
        .min(1, "Description is required")
        .transform((val) => validator.escape(val.trim())),
    tags: z.string()
        .optional()
        .transform((val) => validator.escape(
            val ? val.trim() : ""
        )),
    content: z
        .string()
        .min(1, "Content is required"),
    published: z.boolean(),
})

export type WriteSchemaType = {
    title: string
    description: string
    tags?: string
    content: string
    published: boolean
}