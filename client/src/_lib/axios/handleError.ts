import { AxiosError } from "axios";

export function handleError(error: unknown) {
    if (error instanceof AxiosError) {
        if (error.response?.data) {
            return error.response.data;
        }
        return {
            success: false,
            message: error.message || "Request failed without server response"
        };
    }
    return {
        success: false,
        message: "Unexpected error occurred"
    }
}
