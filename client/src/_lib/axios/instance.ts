import axios from "axios";

export const csrfInstance = axios.create({
    baseURL: "/api",
    withCredentials: true
});

export const userInstance = axios.create({
    baseURL: "/api/user",
    withCredentials: true
});

export const blogInstance = axios.create({
    baseURL: "/api/blog",
    withCredentials: true
});

export const axiosInstance = [
    userInstance,
    blogInstance
]