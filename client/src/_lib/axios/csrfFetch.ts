import {
    csrfInstance,
    axiosInstance
} from "@/_lib/axios/instance";

export const csrfFetch = async () => {
    try {
        const res = await csrfInstance.get("/csrf-token");
        const token = res.data?.csrfToken;

        if (token) {
            // Set the token in the axios instance
            // userInstance.defaults.headers.common["X-CSRF-Token"] = token;

            // Set the token in all axios instances
            axiosInstance.flatMap((instance) => {
                instance.defaults.headers.common["X-CSRF-Token"] = token;
            })

            return true;
        } else {
            throw new Error("Failed to fetch CSRF token");
        }

    } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw error;
    }
};
