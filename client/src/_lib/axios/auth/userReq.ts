import { userInstance } from "@/_lib/axios/instance";
import { handleError } from "@/_lib/axios/handleError";
import type {
    LoginPayload,
    SignUpPayload
} from "@/_types/userPayload";

export const loginReq = async (payload: LoginPayload) => {
    try {
        const { data } = await userInstance.post("login", payload);

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const signUpReq = async (payload: SignUpPayload) => {
    try {
        const { data } = await userInstance.post("signup", payload);

        return data;
    } catch (error) {
        return handleError(error);
    }
};

export const verifyEmailReq = async ({ pin }: { pin: string }) => {
    try {
        const { data } = await userInstance.post("verify-otp", { pin });

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const resendOtpReq = async () => {
    try {
        const { data } = await userInstance.post("resend-otp", {});

        return data;
    } catch (error) {
        return handleError(error);
    }
}

export const logoutReq = async () => {
    try {
        const response = await userInstance.post("logout", {});

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return handleError(error);
    }
}

export const profileReq = async () => {
    try {
        const response = await userInstance.get("profile");

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return handleError(error);
    }
};
