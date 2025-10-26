import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    loginReq,
    verifyEmailReq,
    signUpReq,
    logoutReq,
    profileReq,
    resendOtpReq
} from "@/_lib/axios/auth/userReq";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: loginReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });

    return {
        mutateAsync,
        isPending,
        isError
    };
}

export const useSignUpMutation = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: signUpReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });

    return {
        mutateAsync,
        isPending,
        isError
    };
}

export const useVerifyEmailMutation = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: verifyEmailReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        }
    });

    return {
        mutateAsync,
        isPending,
        isError
    };
}

export const useResendOtpMutation = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: resendOtpReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        }
    });

    return {
        mutateAsync,
        isPending,
        isError
    };
}

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: logoutReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });

    return {
        mutateAsync,
        isPending,
        isError
    };
};

export const useProfileQuery = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: profileReq,
        retry: false,
    });

    return { data, isLoading, isError };
};
