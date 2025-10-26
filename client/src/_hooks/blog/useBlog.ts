import LZString from "lz-string";
import { 
    useState, 
    useCallback, 
    useMemo,
    useEffect
 } from "react";
import { useNavigate } from "react-router";
import {
    useBlogForm
} from "@/_lib/schema/useBlogForm";
import { 
    useBlogBySlugQuery,
    useAllBlogQuery,
    useBlogUploadMutation,
    useLikedBlogQuery,
    useBlogLikeMutation
 } from "@/_lib/tanstack/query/useBlogQuery";
import { toast } from "sonner";
import type { WriteSchemaType } from "@/_validations/blogValidation";

export const useBlog = () => {
    // State
    const [searchInput, setSearchInput] = useState("");
    const [likedSlugs, setLikedSlugs] = useState<string[]>([]);

    // Schema
    const { formWrite } = useBlogForm();

    // Router
    const navigate = useNavigate();

    // API calls
    const { 
        data: allBlogsResponse, 
        isLoading: allBlogsLoading, 
        isError: allBlogsError 
    } = useAllBlogQuery();

    const {
        mutateAsync: blogUpload,
        // isPending: blogUploadPending,
        // isError: blogUploadError
    } = useBlogUploadMutation();

    const {
        mutateAsync: blogLike,
        // isPending: blogLikePending,
        // isError: blogLikeError
    } = useBlogLikeMutation();

    const { 
        data: likedBlogsResponse, 
        // isLoading: likedBlogsLoading, 
        // isError: likedBlogsError 
    } = useLikedBlogQuery();

    // Handlers
    const onSubmit = useCallback(async (data: WriteSchemaType) => {
            // console.log(data);
    
            const { tags, content, ...rest } = data;

            // Transform
            const parsedTags = tags ? tags.split(/[,\s]+/)
                .filter(tag => tag.trim() !== "") : [];
            const compressedContent = LZString.compressToBase64(content);
    
            const newBlog = {
                ...rest,
                content: compressedContent,
                tags: parsedTags,
            };
    
            const resBlogUpload = await blogUpload(newBlog);
    
            if (!resBlogUpload.success) {
                toast.info(resBlogUpload.message, { 
                    position: "top-center",
                    style: {
                        color: "#fff",
                    }
                 });
                navigate("/auth/login", { replace: true });
            }
    
            toast.success("Blog created successfully");
            navigate("/explore", { replace: true });
            formWrite.reset();
        }, [blogUpload, navigate, formWrite]);

    const handleBlogLike = useCallback(async (slugValue: string) => {
        // ✅ 1. Lakukan optimistic update lebih dulu
        setLikedSlugs(prev =>
            prev.includes(slugValue)
                ? prev.filter(item => item !== slugValue)
                : [...prev, slugValue]
        );

        try {
            const resBlogLike = await blogLike(slugValue);

            if (!resBlogLike.success) {
                toast.info(resBlogLike.message, { 
                    position: "top-center",
                    style: {
                        color: "#fff",
                    }
                 });
                navigate("/auth/login", { replace: true });

                // 🔁 2. Revert UI kalau gagal
                setLikedSlugs(prev =>
                    prev.includes(slugValue)
                        ? prev.filter(item => item !== slugValue)
                        : [...prev, slugValue]
                );
            }
        } catch {
            // 🔁 3. Revert juga kalau error jaringan
            setLikedSlugs(prev =>
                prev.includes(slugValue)
                    ? prev.filter(item => item !== slugValue)
                    : [...prev, slugValue]
            );
            toast.error("Failed to like this post, please try again later.");
        }
    }, [blogLike, navigate]);


    const allBlogsFiltered = useMemo(() => {
        const allBlogs = Array.isArray(allBlogsResponse)
            ? allBlogsResponse
            : [];

        return allBlogs.filter((item) => {
            return item.title.toLowerCase().includes(searchInput.toLowerCase());
        });
    }, [allBlogsResponse, searchInput]);

    useEffect(() => {
        if (!likedBlogsResponse || !likedBlogsResponse.likedSlugs) return;

        setLikedSlugs((prev) => {
            const serverSlugs = likedBlogsResponse.likedSlugs;

            // console.log("prev", prev);
            // console.log(JSON.stringify(prev) !== JSON.stringify(serverSlugs));
            // console.log("serverSlugs", serverSlugs);

            // Convert object array to string
            if (JSON.stringify(prev) !== JSON.stringify(serverSlugs)) {
                return serverSlugs;
            }
            return prev;
        });
    }, [likedBlogsResponse]);

    
    return { 
        allBlogsLoading,
        allBlogsError,
        searchInput,
        setSearchInput,
        handleBlogLike,
        likedSlugs,
        allBlogsFiltered,
        useBlogBySlugQuery,
        formWrite,
        onSubmit
     }
}