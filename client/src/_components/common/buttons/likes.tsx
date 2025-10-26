import { memo } from "react";
import { useAuthContext } from "@/_hooks/auth/useAuthContext";
import { Button } from "@/_components/ui/button";
import { Heart } from "lucide-react";

export const LikeButton = memo(({ slug, handleBlogLike, likedSlugs, likeCount }: { slug: string; handleBlogLike: (slug: string) => void; likedSlugs: Array<string>; likeCount: number }) => {
    const { payload } = useAuthContext();

    return (
        <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            className="cursor-pointer hover:text-red-400 hover:bg-transparent"
            onClick={() => handleBlogLike(slug)}
        >
            <Heart
                className={payload && likedSlugs.includes(slug) ? "fill-red-400 text-transparent" : ""}
                aria-label="Like"
            />
            {likeCount}
        </Button>
    )
});