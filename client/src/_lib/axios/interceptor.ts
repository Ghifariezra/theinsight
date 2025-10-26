import axios from "axios";
import { csrfFetch } from "@/_lib/axios/csrfFetch";

axios.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        // Pastikan ini error 403 dan belum di-retry
        if (
            err.response?.status === 403 &&
            !originalRequest._retry &&
            (
                err.response?.data?.message?.includes("invalid csrf token") ||
                err.response?.data?.message?.includes("expired csrf token")
            )
        ) {
            console.warn("🔄 Refreshing CSRF token...");
            originalRequest._retry = true;

            try {
                await csrfFetch();
                return axios(originalRequest);
            } catch (csrfErr) {
                console.error("CSRF refresh failed:", csrfErr);
                return Promise.reject(csrfErr);
            }
        }

        return Promise.reject(err);
    }
);
