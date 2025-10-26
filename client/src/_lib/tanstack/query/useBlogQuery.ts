import {
    blogReq,
    blogBySlugReq,
    blogLikedReq,
    blogLikeReq,
    blogUploadReq
} from "@/_lib/axios/blog/blogReq";
import { 
    useQuery,
    useMutation,
    useQueryClient
 } from "@tanstack/react-query";

export const useAllBlogQuery = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["blog"],
        queryFn: blogReq,
        retry: false,
    });

    return { data, isLoading, isError };
};

export const useBlogBySlugQuery = (slug: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["blog", slug],
        queryFn: async () => blogBySlugReq(slug),
        retry: false,
    });

    return { data, isLoading, isError };
}

export const useBlogUploadMutation = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: blogUploadReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blog"],
            });
        }
    });

    return {
        mutateAsync,
        isPending,
        isError
    }
}

export const useLikedBlogQuery = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["likedBlog"],
        queryFn: blogLikedReq,
        retry: false,
    });

    return { data, isLoading, isError };
}

export const useBlogLikeMutation = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: blogLikeReq,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blog"],
            });
            queryClient.invalidateQueries({
                queryKey: ["likedBlog"],
            });
        }
    });

    return {
        mutateAsync,
        isPending,
        isError
    }
}