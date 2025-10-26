import { blogInstance } from "@/_lib/axios/instance";
import { handleError } from "@/_lib/axios/handleError";
import type { Blog, BlogBySlug, BlogUpload } from "@/_types/blogPayload";

export const blogReq = async (): Promise<Blog[]> => {
    try {
        const { data } = await blogInstance.get("")

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const blogBySlugReq = async (slug: string): Promise<BlogBySlug> => {
    try {
        const { data } = await blogInstance.get(`/${slug}`)

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const blogUploadReq = async (payload: BlogUpload) => {
    try {
        const { data } = await blogInstance.post("write", payload)

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const blogLikedReq = async () => {
    try {
        const { data } = await blogInstance.get("liked")

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const blogLikeReq = async (slug: string) => {
    try {
        const { data } = await blogInstance.post("like", { slug });

        return data;
    } catch (error) {
        return handleError(error);
    }
}