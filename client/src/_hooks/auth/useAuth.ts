import validator from "validator";
import {
    type LoginSchemaType,
    type RegisterSchemaType,
    type VerificationSchemaType
} from "@/_validations/userValidation";
import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
    useLoginMutation,
    useSignUpMutation,
    useResendOtpMutation,
    useVerifyEmailMutation,
    useLogoutMutation,
    useProfileQuery
} from "@/_lib/tanstack/query/useUserQuery";
import { useUserForm } from "@/_lib/schema/useUserForm";
import type { UserPayload } from "@/_types/userPayload";

export const useAuth = () => {
    // State
    const [payload, setPayload] = useState<UserPayload | null>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const [avatar, setAvatar] = useState(false);

    // Router
    const navigate = useNavigate();

    // API calls

    const {
        mutateAsync: login,
        isPending: loginPending,
        isError: loginError
    } = useLoginMutation();

    const {
        mutateAsync: signUp,
        isPending: signUpPending,
        isError: signUpError
    } = useSignUpMutation();

    const {
        mutateAsync: resendOtp,
        isPending: resendPending,
        isError: resendError
    } = useResendOtpMutation();

    const {
        mutateAsync: verifyEmail,
        isPending: verifyPending,
        isError: verifyError
    } = useVerifyEmailMutation();

    const {
        data,
        isLoading,
        isError
    } = useProfileQuery();

    const {
        mutateAsync: logout,
        isPending: logoutPending,
        isError: logoutError
    } = useLogoutMutation();

    // Schema & Form Submit
    const {
        formLogin,
        formSignup,
        formVerification
    } = useUserForm();

    // Handlers
    const handleGoogleLogin = useCallback(() => {
        // console.log(window.location.origin);

        window.open(
            "/auth/google",
            "_blank",
            "width=500,height=600"
        );

        const listener = async (event: MessageEvent) => {
            if (event.data.type === "OAUTH_SUCCESS") {
                console.log(event);
                window.removeEventListener("message", listener);

                navigate(0);

                toast.success(
                    "Login successful with Google!",
                    {
                        position: "top-center"
                    }
                );
            }
        };

        window.addEventListener("message", listener);
    }, [navigate]);

    const onSubmitLogin = useCallback(async (values: LoginSchemaType) => {
        console.log(values);

        const resLogin = await login(values);

        if (!resLogin.success) {
            if (resLogin.message === "Please login with Google") {
                toast.info(resLogin.message, {
                    position: "top-center",
                    style: {
                        backgroundColor: "#4285F4",
                        color: "#fff"
                    },
                    actionButtonStyle: {
                        backgroundColor: "#fff",
                        color: "#4285F4",
                    },
                    action: {
                        label: "Login with Google",
                        type: "button",
                        onClick: () => {
                            handleGoogleLogin();
                        }
                    }, 
                    duration: 10000
                });
                
                return;
            }
            return toast.warning(resLogin.message);
        }

        formLogin.reset();
        navigate("/dashboard", { replace: true });

        toast.success(resLogin.message, {
            position: "top-center",
        });

    }, [login, navigate, formLogin, handleGoogleLogin]);

    const onSubmitSignup = useCallback(async (values: RegisterSchemaType) => {
        console.log(values)

        if (values.name !== validator.unescape(values.name)) {
            toast.error("Name contains invalid characters");
            return;
        }

        const resRegis = await signUp(values);
        // console.log(resRegis);

        if (!resRegis.success) {
            toast.warning(resRegis.message);
            return;
        }

        formSignup.reset();
        navigate("/auth/verify", { replace: true });

        toast.success("Success", {
            description: resRegis.message,
            position: "top-center",
        })
    }, [signUp, navigate, formSignup]);

    const onSubmitVerification = useCallback(async (values: VerificationSchemaType) => {
        console.log(values);

        const resVerify = await verifyEmail(values);

        if (!resVerify.success) {
            toast.warning(resVerify.message);
            return;
        }

        formVerification.reset();
        navigate("/dashboard", { replace: true });

        toast.success(resVerify.message, {
            position: "top-center",
        });

    }, [verifyEmail, navigate, formVerification]);

    const resendVerificationCode = useCallback(async () => {
        const resResend = await resendOtp();

        if (!resResend.success) {
            toast.warning(resResend.message);
            return;
        }

        toast.success(resResend.message, {
            position: "top-center",
        })
    }, [resendOtp]);

    const handleLogout = useCallback(async ({ to }: { to: string }) => {
        try {
            const response = await logout();

            if (!response) {
                toast.error("Logout failed. Please try again.");
                return;
            }

            navigate(to, { replace: true });

            formLogin.reset();
            setAvatar(false);

            toast.success(response.message, {
                position: "top-center"
            });
        } catch (error) {
            console.log(error);
        }
    }, [logout, navigate, formLogin]);

    const handleProfile = useCallback(() => {
        setAvatar(prev => !prev);
    }, []);

    useEffect(() => {
        if (!isError && data && data.user) {
            setPayload(data);
        }

        return () => {
            setPayload(null);
        }
    }, [data, isError]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setAvatar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return {
        payload,
        isLoading,
        isAuthenticated: payload ? true : false,
        isVerified: payload?.user.isVerified || false,
        avatarImg: payload?.user.avatar || "",
        formLogin,
        formSignup,
        formVerification,
        onSubmitLogin,
        onSubmitSignup,
        onSubmitVerification,
        resendVerificationCode,
        handleGoogleLogin,
        handleLogout,
        handleProfile,
        avatar,
        profileRef,
        loginPending,
        signUpPending,
        verifyPending,
        resendPending,
        logoutPending,
        loginError,
        signUpError,
        verifyError,
        resendError,
        logoutError
    }
}